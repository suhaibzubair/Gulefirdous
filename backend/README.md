# Gulefirdous Backend

This service is the secure bridge between the Gulefirdous app and WooCommerce.
It keeps WooCommerce REST API keys on the server and exposes app-safe product,
order, and webhook endpoints.

## Local setup

1. Copy the example environment file:

   `cp .env.example .env`

2. Fill in:

   - `WOOCOMMERCE_SITE_URL`
   - `WOOCOMMERCE_CONSUMER_KEY`
   - `WOOCOMMERCE_CONSUMER_SECRET`
   - `WOOCOMMERCE_WEBHOOK_SECRET`

3. Start the server:

   `npm start`

   The server loads `backend/.env` automatically for local development.

## Endpoints

- `GET /health`
- `GET /api/products`
- `POST /api/products`
- `GET /api/orders`
- `PATCH /api/orders/:id/status`
- `GET /api/shop/status`
- `POST /api/shop/launch`
- `POST /api/webhooks/woocommerce/order`
- `POST /api/product-images/generate`

## WordPress/WooCommerce setup

In WordPress admin:

1. Confirm WooCommerce is active.
2. Enable Cash on Delivery from WooCommerce payments.
3. Create WooCommerce REST API keys from WooCommerce settings.
4. Store those keys only in this backend's `.env` file or deployment secrets.
5. Create an order webhook pointing to `/api/webhooks/woocommerce/order`.

Never put WooCommerce consumer secrets in the React frontend or mobile app.

## Shop page / coming soon mode

WooCommerce can hide the storefront behind **Coming soon** mode even when products are
published. The backend disables that automatically when a product is created or updated,
and you can also call `POST /api/shop/launch` manually.
