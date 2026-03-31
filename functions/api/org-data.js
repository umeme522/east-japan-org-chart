const DEFAULT_PAYLOAD = {
  version: 1,
  updatedAt: "",
  branches: [],
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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
    "CREATE TABLE IF NOT EXISTS org_state (id INTEGER PRIMARY KEY, payload TEXT NOT NULL, updated_at TEXT NOT NULL)"
  ).run();
}

async function readPayload(env) {
  await ensureDatabase(env);

  const row = await env.ORG_DB.prepare(
    "SELECT payload, updated_at FROM org_state WHERE id = 1 LIMIT 1"
  ).first();

  if (!row?.payload) {
    return DEFAULT_PAYLOAD;
  }

  try {
    const payload = JSON.parse(row.payload);
    return {
      ...DEFAULT_PAYLOAD,
      ...payload,
      updatedAt: payload?.updatedAt || row.updated_at || "",
    };
  } catch {
    return DEFAULT_PAYLOAD;
  }
}

async function writePayload(env, payload) {
  await ensureDatabase(env);

  const updatedAt = new Date().toISOString();
  const normalizedPayload = {
    ...DEFAULT_PAYLOAD,
    ...payload,
    updatedAt,
  };
  await env.ORG_DB.prepare(
    `
      INSERT INTO org_state (id, payload, updated_at)
      VALUES (1, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        payload = excluded.payload,
        updated_at = excluded.updated_at
    `
  )
    .bind(JSON.stringify(normalizedPayload), updatedAt)
    .run();

  return updatedAt;
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestGet(context) {
  try {
    const payload = await readPayload(context.env);
    return createJsonResponse(payload);
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
    const isObject = payload && typeof payload === "object";

    if (!isObject) {
      return createJsonResponse({ ok: false, message: "JSON の保存に失敗しました。" }, 400);
    }

    const updatedAt = await writePayload(context.env, payload);
    return createJsonResponse({ ok: true, updatedAt });
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
