function normalizeSiteUrl(siteUrl) {
  if (!siteUrl) {
    throw new Error("WOOCOMMERCE_SITE_URL is required");
  }

  return siteUrl.replace(/\/+$/, "");
}

function getWordPressMediaCredentials(env = process.env) {
  const username = env.WORDPRESS_USERNAME;
  const applicationPassword = env.WORDPRESS_APPLICATION_PASSWORD;

  if (!username || !applicationPassword) {
    const error = new Error(
      "WordPress application password is required for gallery uploads. Set WORDPRESS_USERNAME and WORDPRESS_APPLICATION_PASSWORD in backend/.env."
    );
    error.status = 503;
    throw error;
  }

  return Buffer.from(`${username}:${applicationPassword}`).toString("base64");
}

function parseDataUrl(dataUrl) {
  const match = String(dataUrl || "").match(/^data:([^;]+);base64,(.+)$/i);

  if (!match) {
    return null;
  }

  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
}

function extensionFromMimeType(mimeType = "") {
  if (mimeType.includes("png")) {
    return "png";
  }

  if (mimeType.includes("webp")) {
    return "webp";
  }

  if (mimeType.includes("gif")) {
    return "gif";
  }

  return "jpg";
}

function sanitizeFilename(filename = "", mimeType = "image/jpeg") {
  const safeName = String(filename)
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  if (safeName && /\.(jpe?g|png|webp|gif)$/i.test(safeName)) {
    return safeName;
  }

  return `${safeName || "gulefirdous-product"}.${extensionFromMimeType(mimeType)}`;
}

async function uploadMediaToWordPress(input = {}, env = process.env) {
  let buffer = input.buffer;
  let mimeType = input.mimeType || "image/jpeg";

  if (!buffer && input.dataUrl) {
    const parsed = parseDataUrl(input.dataUrl);

    if (!parsed) {
      const error = new Error("Gallery image must be a base64 data URL or raw image bytes.");
      error.status = 400;
      throw error;
    }

    buffer = parsed.buffer;
    mimeType = parsed.mimeType || mimeType;
  }

  if (!buffer && input.base64) {
    buffer = Buffer.from(String(input.base64).replace(/^data:[^;]+;base64,/i, ""), "base64");
  }

  if (!buffer || !Buffer.isBuffer(buffer) || buffer.length === 0) {
    const error = new Error("Image data is required.");
    error.status = 400;
    throw error;
  }

  const filename = sanitizeFilename(input.filename, mimeType);
  const siteUrl = normalizeSiteUrl(env.WOOCOMMERCE_SITE_URL);
  const response = await fetch(`${siteUrl}/wp-json/wp/v2/media`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getWordPressMediaCredentials(env)}`,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": mimeType,
      Accept: "application/json",
    },
    body: buffer,
  });

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.message || `WordPress media upload failed with ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return {
    id: data.id,
    sourceUrl: data.source_url || data.guid?.rendered || "",
    media: data,
  };
}

module.exports = {
  extensionFromMimeType,
  parseDataUrl,
  sanitizeFilename,
  uploadMediaToWordPress,
};
