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

async function wcAdminRequest(path, options = {}, env = process.env) {
  const siteUrl = normalizeSiteUrl(env.WOOCOMMERCE_SITE_URL);
  const response = await fetch(`${siteUrl}/wp-json/wc-admin${path}`, {
    method: options.method || "GET",
    headers: {
      Authorization: `Basic ${getCredentials(env)}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || `WooCommerce admin request failed with ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

async function getComingSoonOptions(env = process.env) {
  const query = new URLSearchParams({
    options: "woocommerce_coming_soon,woocommerce_store_pages_only",
  });

  return wcAdminRequest(`/options?${query.toString()}`, {}, env);
}

async function launchStore(env = process.env) {
  const before = await getComingSoonOptions(env);

  if (before.woocommerce_coming_soon === "no") {
    return {
      launched: false,
      alreadyLive: true,
      options: before,
      message: "Store is already live on gulefirdous.com.",
    };
  }

  await wcAdminRequest(
    "/options",
    {
      method: "POST",
      body: {
        woocommerce_coming_soon: "no",
        woocommerce_store_pages_only: "no",
      },
    },
    env
  );

  const after = await getComingSoonOptions(env);

  return {
    launched: after.woocommerce_coming_soon === "no",
    alreadyLive: false,
    options: after,
    message:
      after.woocommerce_coming_soon === "no"
        ? "Store launched. Products are now visible on gulefirdous.com/shop."
        : "Could not confirm that coming soon mode was disabled.",
  };
}

module.exports = {
  getComingSoonOptions,
  launchStore,
};
