const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
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

function generatePhotoId() {
  return crypto.randomUUID?.() ?? `photo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function parseDataUrl(dataUrl) {
  const match = normalizeText(dataUrl).match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    return null;
  }

  try {
    return {
      mimeType: match[1],
      buffer: Uint8Array.from(atob(match[2]), (char) => char.charCodeAt(0)),
    };
  } catch {
    return null;
  }
}

async function ensureDatabase(env) {
  if (!env?.ORG_DB) {
    throw new Error("missing-d1-binding");
  }

  await env.ORG_DB.prepare(
    "CREATE TABLE IF NOT EXISTS org_photos (id TEXT PRIMARY KEY, data_url TEXT NOT NULL, mime_type TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)"
  ).run();
}

async function readPhotoRecord(env, photoId) {
  await ensureDatabase(env);
  const row = await env.ORG_DB.prepare(
    "SELECT data_url, mime_type FROM org_photos WHERE id = ? LIMIT 1"
  )
    .bind(photoId)
    .first();

  return row || null;
}

async function writePhotoRecord(env, photoId, dataUrl) {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) {
    throw new Error("invalid-photo");
  }

  await ensureDatabase(env);
  const id = normalizeText(photoId) || generatePhotoId();
  const now = new Date().toISOString();

  await env.ORG_DB.prepare(
    `
      INSERT INTO org_photos (id, data_url, mime_type, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        data_url = excluded.data_url,
        mime_type = excluded.mime_type,
        updated_at = excluded.updated_at
    `
  )
    .bind(id, dataUrl, parsed.mimeType, now, now)
    .run();

  return id;
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestGet(context) {
  try {
    const photoId = new URL(context.request.url).searchParams.get("id") || "";
    if (!photoId) {
      return createJsonResponse({ ok: false, message: "画像IDが必要です。" }, 400);
    }

    const row = await readPhotoRecord(context.env, photoId);
    const parsed = row?.data_url ? parseDataUrl(row.data_url) : null;
    if (!parsed) {
      return new Response("Not Found", { status: 404, headers: CORS_HEADERS });
    }

    return new Response(parsed.buffer, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Cache-Control": "public, max-age=86400",
        "Content-Type": row.mime_type || parsed.mimeType,
      },
    });
  } catch (error) {
    console.error("org-photo GET failed", error);
    return createJsonResponse(
      {
        ok: false,
        message: "画像の取得に失敗しました。",
        details: String(error?.message ?? error),
      },
      500
    );
  }
}

export async function onRequestPost(context) {
  try {
    const payload = await context.request.json();
    const dataUrl = normalizeText(payload?.dataUrl);
    if (!dataUrl) {
      return createJsonResponse({ ok: false, message: "画像の保存に失敗しました。" }, 400);
    }

    const photoId = await writePhotoRecord(context.env, payload?.photoId, dataUrl);
    return createJsonResponse({ ok: true, photoId });
  } catch (error) {
    console.error("org-photo POST failed", error);
    return createJsonResponse(
      {
        ok: false,
        message: "画像の保存に失敗しました。",
        details: String(error?.message ?? error),
      },
      400
    );
  }
}
