const DEFAULT_PAYLOAD = {
  version: 1,
  updatedAt: "",
  branches: [],
};

function createJsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

async function ensureDatabase(env) {
  if (!env?.ORG_DB) {
    throw new Error("missing-d1-binding");
  }

  await env.ORG_DB.exec(`
    CREATE TABLE IF NOT EXISTS org_state (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      payload TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}

async function readPayload(env) {
  await ensureDatabase(env);

  const row = await env.ORG_DB.prepare(
    "SELECT payload FROM org_state WHERE id = 1 LIMIT 1"
  ).first();

  if (!row?.payload) {
    return DEFAULT_PAYLOAD;
  }

  try {
    return JSON.parse(row.payload);
  } catch {
    return DEFAULT_PAYLOAD;
  }
}

async function writePayload(env, payload) {
  await ensureDatabase(env);

  const updatedAt = new Date().toISOString();
  await env.ORG_DB.prepare(
    `
      INSERT INTO org_state (id, payload, updated_at)
      VALUES (1, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        payload = excluded.payload,
        updated_at = excluded.updated_at
    `
  )
    .bind(JSON.stringify(payload), updatedAt)
    .run();

  return updatedAt;
}

export async function onRequestGet(context) {
  try {
    const payload = await readPayload(context.env);
    return createJsonResponse(payload);
  } catch {
    return createJsonResponse({ ok: false, message: "共有データの取得に失敗しました。" }, 500);
  }
}

export async function onRequestPut(context) {
  try {
    const payload = await context.request.json();
    const isObject = payload && typeof payload === "object";

    if (!isObject) {
      return createJsonResponse({ ok: false, message: "JSON の保存に失敗しました。" }, 400);
    }

    const updatedAt = await writePayload(context.env, payload);
    return createJsonResponse({ ok: true, updatedAt });
  } catch {
    return createJsonResponse({ ok: false, message: "JSON の保存に失敗しました。" }, 400);
  }
}
