const http = require("node:http");
const path = require("node:path");
const { createCategoryStore, slugifyCategoryName } = require("./categoryStore");
const { createNextImageBatch, getPhotoPoolSize } = require("./productImages");
const { createWooCommerceClient, verifyWooCommerceSignature } = require("./woocommerceClient");
const { getComingSoonOptions, launchStore } = require("./wordpressSiteVisibility");

const jsonHeaders = {
  "Content-Type": "application/json",
};

function sendJson(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, { ...jsonHeaders, ...extraHeaders });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function parseJson(rawBody) {
  if (!rawBody) {
    return {};
  }

  return JSON.parse(rawBody);
}

function getCorsHeaders(env = process.env) {
  return {
    "Access-Control-Allow-Origin": env.FRONTEND_ORIGIN || "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,X-WC-Webhook-Signature",
  };
}

async function ensureStoreIsLive(launchStoreFn, env) {
  try {
    return await launchStoreFn(env);
  } catch (error) {
    return {
      launched: false,
      alreadyLive: false,
      message: error.message || "Could not launch the storefront.",
    };
  }
}

function sanitizeProduct(input) {
  const stockQuantity = input.stock_quantity ?? input.stock;
  const hasStockQuantity = stockQuantity !== undefined && stockQuantity !== null && stockQuantity !== "";

  return {
    name: input.name,
    type: input.type || "simple",
    status: input.status || "publish",
    catalog_visibility: input.catalog_visibility || "visible",
    regular_price: String(input.regular_price || input.price || ""),
    description: input.description || "",
    short_description: input.short_description || input.description || "",
    categories: input.categories || [],
    images: input.images || [],
    stock_quantity: hasStockQuantity ? Number(stockQuantity) : undefined,
    manage_stock: hasStockQuantity,
    stock_status:
      input.stock_status ||
      (hasStockQuantity && Number(stockQuantity) > 0 ? "instock" : hasStockQuantity ? "outofstock" : "instock"),
  };
}

function createServer(options = {}) {
  const env = options.env || process.env;
  const client = options.client || createWooCommerceClient(env);
  const launchStoreFn = options.launchStore || launchStore;
  const getComingSoonOptionsFn = options.getComingSoonOptions || getComingSoonOptions;
  const categoryStore =
    options.categoryStore ||
    createCategoryStore(
      options.categoryDataFile || path.join(__dirname, "../data/categories.json")
    );

  return http.createServer(async (request, response) => {
    const corsHeaders = getCorsHeaders(env);

    if (request.method === "OPTIONS") {
      response.writeHead(204, corsHeaders);
      response.end();
      return;
    }

    const url = new URL(request.url, `http://${request.headers.host}`);

    try {
      if (request.method === "GET" && url.pathname === "/health") {
        sendJson(response, 200, { ok: true, service: "gulefirdous-backend" }, corsHeaders);
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/categories") {
        sendJson(response, 200, { categories: categoryStore.listCategories() }, corsHeaders);
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/categories") {
        const { name, description } = parseJson(await readBody(request));
        let wooCommerceId = null;

        if (typeof client.createCategory === "function") {
          try {
            const wooCategory = await client.createCategory({
              name: String(name || "").trim(),
              slug: slugifyCategoryName(String(name || "").trim()),
              description: String(description || "").trim(),
            });
            wooCommerceId = wooCategory?.id ?? null;
          } catch (error) {
            if (!env.ALLOW_LOCAL_CATEGORY_FALLBACK) {
              throw error;
            }
          }
        }

        const category = categoryStore.createCategory({
          name,
          description,
          wooCommerceId,
        });
        sendJson(response, 201, { category }, corsHeaders);
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/products") {
        const products = await client.listProducts({
          page: url.searchParams.get("page"),
          perPage: url.searchParams.get("perPage"),
          search: url.searchParams.get("search"),
          status: url.searchParams.get("status") || "publish",
        });
        sendJson(response, 200, { products }, corsHeaders);
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/shop/status") {
        const options = await getComingSoonOptionsFn(env);
        sendJson(
          response,
          200,
          {
            comingSoon: options.woocommerce_coming_soon === "yes",
            storePagesOnly: options.woocommerce_store_pages_only === "yes",
            options,
          },
          corsHeaders
        );
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/shop/launch") {
        const launchResult = await launchStoreFn(env);
        sendJson(response, 200, launchResult, corsHeaders);
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/products") {
        const product = sanitizeProduct(parseJson(await readBody(request)));
        const createdProduct = await client.createProduct(product);
        const storeLaunch = await ensureStoreIsLive(launchStoreFn, env);
        sendJson(response, 201, { product: createdProduct, storeLaunch }, corsHeaders);
        return;
      }

      const productUpdateMatch = url.pathname.match(/^\/api\/products\/([^/]+)$/);
      if (request.method === "PUT" && productUpdateMatch) {
        const product = sanitizeProduct(parseJson(await readBody(request)));
        const updatedProduct = await client.updateProduct(productUpdateMatch[1], product);
        const storeLaunch = await ensureStoreIsLive(launchStoreFn, env);
        sendJson(response, 200, { product: updatedProduct, storeLaunch }, corsHeaders);
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/product-images/generate") {
        const { productName, generationCount, seenPhotoKeys, nonce, category } = parseJson(
          await readBody(request)
        );
        const seenKeys = new Set(Array.isArray(seenPhotoKeys) ? seenPhotoKeys : []);
        const resolvedCategory = category || "Perfume";
        const result = createNextImageBatch(
          productName || `Gulefirdous ${resolvedCategory}`,
          generationCount || 1,
          seenKeys,
          nonce || Date.now(),
          undefined,
          resolvedCategory
        );

        sendJson(
          response,
          200,
          {
            images: result.images,
            seenPhotoKeys: [...seenKeys],
            category: result.category,
            poolSize: result.poolSize,
            mode: "category-studio-photos",
            message: `Added ${result.images.length} new unique ${resolvedCategory} photos · ${result.totalShown} shown from ${getPhotoPoolSize(resolvedCategory)} base images.`,
          },
          corsHeaders
        );
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/orders") {
        const orders = await client.listOrders({
          page: url.searchParams.get("page"),
          perPage: url.searchParams.get("perPage"),
          status: url.searchParams.get("status"),
        });
        sendJson(response, 200, { orders }, corsHeaders);
        return;
      }

      const orderStatusMatch = url.pathname.match(/^\/api\/orders\/([^/]+)\/status$/);
      if (request.method === "PATCH" && orderStatusMatch) {
        const { status } = parseJson(await readBody(request));

        if (!status) {
          sendJson(response, 400, { error: "Order status is required" }, corsHeaders);
          return;
        }

        const order = await client.updateOrderStatus(orderStatusMatch[1], status);
        sendJson(response, 200, { order }, corsHeaders);
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/webhooks/woocommerce/order") {
        const rawBody = await readBody(request);
        const isValid = verifyWooCommerceSignature(
          rawBody,
          request.headers["x-wc-webhook-signature"],
          env.WOOCOMMERCE_WEBHOOK_SECRET
        );

        if (!isValid) {
          sendJson(response, 401, { error: "Invalid webhook signature" }, corsHeaders);
          return;
        }

        const event = parseJson(rawBody);
        sendJson(response, 202, { received: true, orderId: event.id }, corsHeaders);
        return;
      }

      sendJson(response, 404, { error: "Route not found" }, corsHeaders);
    } catch (error) {
      sendJson(
        response,
        error.status || 500,
        { error: error.message || "Unexpected server error" },
        corsHeaders
      );
    }
  });
}

module.exports = {
  createServer,
  readBody,
  sanitizeProduct,
};
