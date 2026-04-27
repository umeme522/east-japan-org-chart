const DEFAULT_PAYLOAD = {
  version: 1,
  revision: 1,
  updatedAt: "",
  branches: [],
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
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
    ...DEFAULT_PAYLOAD,
    ...(payload && typeof payload === "object" ? payload : {}),
  };

  normalized.version = normalizeRevision(normalized.version) || DEFAULT_PAYLOAD.version;
  normalized.revision = normalizeRevision(normalized.revision) || fallbackRevision || DEFAULT_PAYLOAD.revision;
  normalized.updatedAt = normalizeText(normalized.updatedAt) || normalizeText(fallbackUpdatedAt) || "";
  normalized.branches = Array.isArray(normalized.branches) ? normalized.branches : [];
  return normalized;
}

function createJsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

async function ensureDatabase(env) {
  if (!env?.ORG_DB) {
    throw new Error("missing-d1-binding");
  }

  await env.ORG_DB.prepare(
    "CREATE TABLE IF NOT EXISTS org_state (id INTEGER PRIMARY KEY, payload TEXT NOT NULL, updated_at TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1)"
  ).run();

  const schema = await env.ORG_DB.prepare("PRAGMA table_info(org_state)").all();
  const hasRevisionColumn = Array.isArray(schema?.results)
    ? schema.results.some((column) => column?.name === "revision")
    : false;

  if (!hasRevisionColumn) {
    await env.ORG_DB.prepare("ALTER TABLE org_state ADD COLUMN revision INTEGER NOT NULL DEFAULT 1").run();
  }
}

async function readCurrentState(env) {
  await ensureDatabase(env);

  const row = await env.ORG_DB.prepare(
    "SELECT payload, updated_at, revision FROM org_state WHERE id = 1 LIMIT 1"
  ).first();

  if (!row?.payload) {
    return { ...DEFAULT_PAYLOAD };
  }

  try {
    const payload = JSON.parse(row.payload);
    return stripRuntimeFields(payload, row.revision || DEFAULT_PAYLOAD.revision, row.updated_at || "");
  } catch {
    return stripRuntimeFields(DEFAULT_PAYLOAD, row.revision || DEFAULT_PAYLOAD.revision, row.updated_at || "");
  }
}

async function writeCurrentState(env, payload, revision, updatedAt) {
  const snapshot = stripRuntimeFields(payload, revision, updatedAt);

  await env.ORG_DB.prepare(
    `
      INSERT INTO org_state (id, payload, updated_at, revision)
      VALUES (1, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        payload = excluded.payload,
        updated_at = excluded.updated_at,
        revision = excluded.revision
    `
  )
    .bind(JSON.stringify(snapshot), snapshot.updatedAt, snapshot.revision)
    .run();

  return snapshot;
}

async function savePayload(env, payload) {
  await ensureDatabase(env);

  const current = await readCurrentState(env);
  const nextRevision = (normalizeRevision(current.revision) || DEFAULT_PAYLOAD.revision) + 1;
  const updatedAt = new Date().toISOString();
  return writeCurrentState(env, payload, nextRevision, updatedAt);
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestGet(context) {
  try {
    const current = await readCurrentState(context.env);
    return createJsonResponse(current);
  } catch (error) {
    console.error("org-data GET failed", error);
    return createJsonResponse(
      {
        ok: false,
        message: "共有データの取得に失敗しました。",
        details: String(error?.message ?? error),
      },
      500
    );
  }
}

export async function onRequestPut(context) {
  try {
    const payload = await context.request.json();
    if (!payload || typeof payload !== "object") {
      return createJsonResponse({ ok: false, message: "JSON の保存に失敗しました。" }, 400);
    }

    const snapshot = await savePayload(context.env, payload);
    return createJsonResponse({
      ok: true,
      updatedAt: snapshot.updatedAt,
      revision: snapshot.revision,
    });
  } catch (error) {
    console.error("org-data PUT failed", error);
    return createJsonResponse(
      {
        ok: false,
        message: "JSON の保存に失敗しました。",
        details: String(error?.message ?? error),
      },
      400
    );
  }
}
