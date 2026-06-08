const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { createCategoryStore } = require("../src/categoryStore");
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

async function withServer(client, callback, env = {}, serverOptions = {}) {
  const server = createServer({
    client,
    ...serverOptions,
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

test("category endpoint lists stored categories", async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gf-categories-"));
  const categoryStore = createCategoryStore(path.join(tempDir, "categories.json"));

  await withServer({}, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/categories`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.ok(body.categories.length >= 4);
    assert.equal(body.categories[0].name, "Perfume");
  }, {}, { categoryStore });
});

test("category endpoint creates a new category", async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gf-categories-"));
  const categoryStore = createCategoryStore(path.join(tempDir, "categories.json"));
  const client = {
    async createCategory(category) {
      assert.equal(category.name, "Candles");
      return { id: 901, name: category.name };
    },
  };

  const server = createServer({
    client,
    categoryStore,
    env: {
      FRONTEND_ORIGIN: "http://localhost:3000",
      WOOCOMMERCE_SITE_URL: "https://gulefirdous.com",
      WOOCOMMERCE_CONSUMER_KEY: "ck_test",
      WOOCOMMERCE_CONSUMER_SECRET: "cs_test",
    },
  });
  const address = await new Promise((resolve) => {
    server.listen(0, () => resolve(`http://127.0.0.1:${server.address().port}`));
  });

  try {
    const response = await fetch(`${address}/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Candles",
        description: "Scented candles",
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.equal(body.category.name, "Candles");
    assert.equal(body.category.wooCommerceId, 901);
    assert.equal(categoryStore.listCategories().some((item) => item.name === "Candles"), true);
  } finally {
    server.close();
  }
});

test("category endpoint rejects duplicate names", async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gf-categories-"));
  const categoryStore = createCategoryStore(path.join(tempDir, "categories.json"));
  const server = createServer({
    categoryStore,
    env: {
      FRONTEND_ORIGIN: "http://localhost:3000",
      ALLOW_LOCAL_CATEGORY_FALLBACK: "true",
      WOOCOMMERCE_SITE_URL: "https://gulefirdous.com",
      WOOCOMMERCE_CONSUMER_KEY: "ck_test",
      WOOCOMMERCE_CONSUMER_SECRET: "cs_test",
    },
  });
  const address = await new Promise((resolve) => {
    server.listen(0, () => resolve(`http://127.0.0.1:${server.address().port}`));
  });

  try {
    const response = await fetch(`${address}/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Perfume" }),
    });

    assert.equal(response.status, 409);
  } finally {
    server.close();
  }
});

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
      body: JSON.stringify({
        productName: "Amber Musk Perfume",
        seed: 42,
        generationCount: 1,
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.images.length, 4);
    assert.match(body.images[0].url, /^https:\/\/images\.(unsplash|pexels)\.com\//);
    assert.equal(body.mode, "category-studio-photos");
    assert.ok(body.seenPhotoKeys);
  });
});

test("product image endpoint returns category-specific photo pools", async () => {
  await withServer({}, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/product-images/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: "Heritage Gift Box",
        generationCount: 1,
        category: "Gift Set",
        seenPhotoKeys: [],
        nonce: 303,
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.category, "Gift Set");
    assert.equal(body.images.length, 4);
    assert.match(body.images[0].label, /Gift Set ·/);
  });
});

test("product image endpoint appends unique photos on each generation", async () => {
  await withServer({}, async (baseUrl) => {
    const firstResponse = await fetch(`${baseUrl}/api/product-images/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: "Amber Musk Perfume",
        generationCount: 1,
        seenPhotoKeys: [],
        nonce: 101,
      }),
    });
    const firstBody = await firstResponse.json();

    const secondResponse = await fetch(`${baseUrl}/api/product-images/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: "Amber Musk Perfume",
        generationCount: 2,
        seenPhotoKeys: firstBody.seenPhotoKeys,
        nonce: 202,
      }),
    });
    const secondBody = await secondResponse.json();

    assert.equal(firstResponse.status, 200);
    assert.equal(secondResponse.status, 200);
    assert.equal(firstBody.images.length, 4);
    assert.equal(secondBody.images.length, 4);
    assert.notEqual(firstBody.images[0].label, secondBody.images[0].label);
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
