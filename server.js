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

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initialPayload = {
      version: 1,
      updatedAt: new Date().toISOString(),
      branches: [],
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialPayload, null, 2), "utf8");
  }
}

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function handleApi(request, response) {
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
      if (!parsed || (typeof parsed !== "object" && !Array.isArray(parsed))) {
        throw new Error("invalid-payload");
      }

      await fs.writeFile(DATA_FILE, JSON.stringify(parsed, null, 2), "utf8");
      sendJson(response, 200, { ok: true, updatedAt: new Date().toISOString() });
    } catch {
      sendJson(response, 400, { ok: false, message: "JSON の保存に失敗しました。" });
    }
    return;
  }

  sendJson(response, 405, { ok: false, message: "許可されていないメソッドです。" });
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
  await ensureDataFile();

  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);

      if (url.pathname === "/api/org-data") {
        await handleApi(request, response);
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
