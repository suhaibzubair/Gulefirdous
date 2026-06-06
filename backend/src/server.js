const http = require("node:http");
const { createWooCommerceClient, verifyWooCommerceSignature } = require("./woocommerceClient");

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
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,X-WC-Webhook-Signature",
  };
}

function sanitizeProduct(input) {
  return {
    name: input.name,
    type: input.type || "simple",
    regular_price: String(input.regular_price || input.price || ""),
    description: input.description || "",
    short_description: input.short_description || input.description || "",
    categories: input.categories || [],
    images: input.images || [],
    stock_quantity: input.stock_quantity,
    manage_stock: input.stock_quantity !== undefined,
  };
}

function createServer(options = {}) {
  const env = options.env || process.env;
  const client = options.client || createWooCommerceClient(env);

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

      if (request.method === "POST" && url.pathname === "/api/products") {
        const product = sanitizeProduct(parseJson(await readBody(request)));
        const createdProduct = await client.createProduct(product);
        sendJson(response, 201, { product: createdProduct }, corsHeaders);
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
