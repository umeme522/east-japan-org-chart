const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const os = require("os");

const ROOT_DIR = __dirname;
const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(ROOT_DIR, "data");
const DATA_FILE = process.env.DATA_FILE
  ? path.resolve(process.env.DATA_FILE)
  : path.join(DATA_DIR, "org-data.json");
const PORT = Number(process.env.PORT) || 3000;

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeRevision(value) {
  const revision = Number.parseInt(normalizeText(value), 10);
  return Number.isFinite(revision) && revision > 0 ? revision : 0;
}

function stripRuntimeFields(payload, fallbackRevision = 1, fallbackUpdatedAt = "") {
  const normalized = {
    version: 1,
    revision: normalizeRevision(payload?.revision) || fallbackRevision || 1,
    updatedAt: normalizeText(payload?.updatedAt) || normalizeText(fallbackUpdatedAt) || "",
    branches: Array.isArray(payload?.branches) ? payload.branches : [],
  };

  return normalized;
}

async function readJsonFile(filePath, fallbackValue) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch {
    return fallbackValue;
  }
}

async function writeJsonFile(filePath, value) {
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  const current = await readJsonFile(DATA_FILE, null);
  if (!current) {
    await writeJsonFile(DATA_FILE, {
      version: 1,
      revision: 1,
      updatedAt: new Date().toISOString(),
      branches: [],
    });
  }

}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload, null, 2));
}

function sendText(response, statusCode, text) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  response.end(text);
}

function publicFilePath(urlPathname) {
  const targetPath = urlPathname === "/" ? "/index.html" : urlPathname;
  const normalizedPath = path.normalize(decodeURIComponent(targetPath)).replace(/^[/\\]+/, "");
  return path.resolve(ROOT_DIR, normalizedPath);
}

async function readCurrentState() {
  const payload = await readJsonFile(DATA_FILE, {
    version: 1,
    revision: 1,
    updatedAt: "",
    branches: [],
  });
  return stripRuntimeFields(payload, payload?.revision || 1, payload?.updatedAt || "");
}

async function writeCurrentState(payload, revision, updatedAt) {
  const snapshot = stripRuntimeFields(payload, revision, updatedAt);
  await writeJsonFile(DATA_FILE, snapshot);
  return snapshot;
}

async function saveSnapshot(payload) {
  const current = await readCurrentState();
  const nextRevision = (normalizeRevision(current.revision) || 1) + 1;
  const updatedAt = new Date().toISOString();
  const snapshot = await writeCurrentState(payload, nextRevision, updatedAt);
  return snapshot;
}

function sendApiJson(response, payload, statusCode = 200) {
  sendJson(response, statusCode, payload);
}

async function handleApi(request, response, url) {
  if (request.method === "GET") {
    const content = await fs.readFile(DATA_FILE, "utf8");
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end(content);
    return;
  }

  if (request.method === "PUT") {
    try {
      const body = await readRequestBody(request);
      const parsed = JSON.parse(body);
      if (!parsed || typeof parsed !== "object") {
        throw new Error("invalid-payload");
      }

      const snapshot = await saveSnapshot(parsed);
      sendApiJson(response, { ok: true, updatedAt: snapshot.updatedAt, revision: snapshot.revision });
    } catch {
      sendApiJson(response, { ok: false, message: "JSON の保存に失敗しました。" }, 400);
    }
    return;
  }

  sendApiJson(response, { ok: false, message: "許可されていないメソッドです。" }, 405);
}

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function handleStatic(request, response, pathname) {
  const filePath = publicFilePath(pathname);
  if (!filePath.startsWith(ROOT_DIR)) {
    sendText(response, 403, "Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    const resolvedPath = stat.isDirectory() ? path.join(filePath, "index.html") : filePath;
    const extension = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[extension] || "application/octet-stream";
    const content = await fs.readFile(resolvedPath);

    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=300",
    });
    response.end(content);
  } catch {
    sendText(response, 404, "Not Found");
  }
}

function networkUrls() {
  const interfaces = os.networkInterfaces();
  const urls = [`http://localhost:${PORT}`];

  Object.values(interfaces).forEach((entries) => {
    (entries || []).forEach((entry) => {
      if (entry.family === "IPv4" && !entry.internal) {
        urls.push(`http://${entry.address}:${PORT}`);
      }
    });
  });

  return [...new Set(urls)];
}

async function startServer() {
  await ensureDataFiles();

  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);

      if (url.pathname === "/api/org-data") {
        await handleApi(request, response, url);
        return;
      }

      await handleStatic(request, response, url.pathname);
    } catch {
      sendJson(response, 500, { ok: false, message: "サーバーエラーが発生しました。" });
    }
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log("共有サーバーを開始しました。");
    networkUrls().forEach((url) => {
      console.log(`- ${url}`);
    });
  });
}

startServer().catch((error) => {
  console.error("サーバー起動に失敗しました。");
  console.error(error);
  process.exit(1);
});
