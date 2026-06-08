const crypto = require("node:crypto");

function normalizeSiteUrl(siteUrl) {
  if (!siteUrl) {
    throw new Error("WOOCOMMERCE_SITE_URL is required");
  }

  return siteUrl.replace(/\/+$/, "");
}

function getCredentials(env = process.env) {
  const consumerKey = env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error("WooCommerce consumer key and secret are required");
  }

  return Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
}

function buildWooUrl(path, query = {}, env = process.env) {
  const siteUrl = normalizeSiteUrl(env.WOOCOMMERCE_SITE_URL);
  const url = new URL(`${siteUrl}/wp-json/wc/v3${path}`);

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

async function wooFetch(path, options = {}, env = process.env) {
  const { query, body, method = "GET" } = options;
  const response = await fetch(buildWooUrl(path, query, env), {
    method,
    headers: {
      Authorization: `Basic ${getCredentials(env)}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || `WooCommerce request failed with ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

function createWooCommerceClient(env = process.env) {
  return {
    listProducts(params = {}) {
      return wooFetch(
        "/products",
        {
          query: {
            per_page: params.perPage || 20,
            page: params.page || 1,
            search: params.search,
            status: params.status || "publish",
          },
        },
        env
      );
    },

    createProduct(product) {
      return wooFetch(
        "/products",
        {
          method: "POST",
          body: product,
        },
        env
      );
    },

    listCategories(params = {}) {
      return wooFetch(
        "/products/categories",
        {
          query: {
            per_page: params.perPage || 100,
            page: params.page || 1,
            search: params.search,
          },
        },
        env
      );
    },

    createCategory(category) {
      return wooFetch(
        "/products/categories",
        {
          method: "POST",
          body: category,
        },
        env
      );
    },

    listOrders(params = {}) {
      return wooFetch(
        "/orders",
        {
          query: {
            per_page: params.perPage || 20,
            page: params.page || 1,
            status: params.status,
          },
        },
        env
      );
    },

    updateOrderStatus(orderId, status) {
      return wooFetch(
        `/orders/${encodeURIComponent(orderId)}`,
        {
          method: "PUT",
          body: { status },
        },
        env
      );
    },
  };
}

function verifyWooCommerceSignature(rawBody, signature, secret) {
  if (!secret) {
    return true;
  }

  if (!signature) {
    return false;
  }

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === signatureBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
  );
}

module.exports = {
  buildWooUrl,
  createWooCommerceClient,
  normalizeSiteUrl,
  verifyWooCommerceSignature,
};
