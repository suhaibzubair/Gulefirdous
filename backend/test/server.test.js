const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createServer } = require("../src/server");
const { buildWooUrl, verifyWooCommerceSignature } = require("../src/woocommerceClient");

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, () => {
      const address = server.address();
      resolve(`http://127.0.0.1:${address.port}`);
    });
  });
}

async function withServer(client, callback, env = {}) {
  const server = createServer({
    client,
    env: {
      FRONTEND_ORIGIN: "http://localhost:3000",
      WOOCOMMERCE_WEBHOOK_SECRET: "test-secret",
      WOOCOMMERCE_SITE_URL: "https://gulefirdous.com",
      WOOCOMMERCE_CONSUMER_KEY: "ck_test",
      WOOCOMMERCE_CONSUMER_SECRET: "cs_test",
      ...env,
    },
  });
  const baseUrl = await listen(server);

  try {
    await callback(baseUrl);
  } finally {
    server.close();
  }
}

test("health endpoint returns service status", async () => {
  await withServer({}, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.service, "gulefirdous-backend");
  });
});

test("product endpoint proxies WooCommerce product list", async () => {
  const client = {
    async listProducts(params) {
      assert.equal(params.search, "oud");
      return [{ id: 1, name: "Royal Oud" }];
    },
  };

  await withServer(client, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/products?search=oud`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body.products, [{ id: 1, name: "Royal Oud" }]);
  });
});

test("product creation sanitizes payload before proxying", async () => {
  const client = {
    async createProduct(product) {
      assert.equal(product.name, "Saffron Rose Perfume");
      assert.equal(product.regular_price, "6100");
      assert.equal(product.manage_stock, true);
      assert.equal(product.stock_quantity, 22);
      return { id: 44, ...product };
    },
  };

  await withServer(client, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Saffron Rose Perfume",
        price: 6100,
        stock_quantity: 22,
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.equal(body.product.id, 44);
  });
});

test("order status endpoint updates WooCommerce order", async () => {
  const client = {
    async updateOrderStatus(orderId, status) {
      assert.equal(orderId, "1007");
      assert.equal(status, "processing");
      return { id: 1007, status: "processing" };
    },
  };

  await withServer(client, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/orders/1007/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "processing" }),
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.order.status, "processing");
  });
});

test("order webhook rejects invalid signatures", async () => {
  await withServer({}, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/webhooks/woocommerce/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WC-Webhook-Signature": "bad-signature",
      },
      body: JSON.stringify({ id: 1007 }),
    });

    assert.equal(response.status, 401);
  });
});

test("order webhook accepts valid WooCommerce signatures", async () => {
  await withServer({}, async (baseUrl) => {
    const body = JSON.stringify({ id: 1007 });
    const signature = crypto.createHmac("sha256", "test-secret").update(body).digest("base64");
    const response = await fetch(`${baseUrl}/api/webhooks/woocommerce/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WC-Webhook-Signature": signature,
      },
      body,
    });
    const responseBody = await response.json();

    assert.equal(response.status, 202);
    assert.equal(responseBody.orderId, 1007);
  });
});

test("product image endpoint returns realistic photo concepts", async () => {
  await withServer({}, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/product-images/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productName: "Amber Musk Perfume", seed: 42 }),
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.images.length, 4);
    assert.match(body.images[0].url, /^https:\/\/images\.(unsplash|pexels)\.com\//);
    assert.equal(body.mode, "realistic-studio-photos");
  });
});

test("WooCommerce URL builder targets wc/v3 endpoints", () => {
  const url = buildWooUrl(
    "/products",
    { search: "attar" },
    { WOOCOMMERCE_SITE_URL: "https://gulefirdous.com/" }
  );

  assert.equal(url.toString(), "https://gulefirdous.com/wp-json/wc/v3/products?search=attar");
});

test("signature helper validates matching signatures", () => {
  const body = JSON.stringify({ id: 1 });
  const signature = crypto.createHmac("sha256", "secret").update(body).digest("base64");

  assert.equal(verifyWooCommerceSignature(body, signature, "secret"), true);
  assert.equal(verifyWooCommerceSignature(body, "wrong", "secret"), false);
});
