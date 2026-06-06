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

## Endpoints

- `GET /health`
- `GET /api/products`
- `POST /api/products`
- `GET /api/orders`
- `PATCH /api/orders/:id/status`
- `POST /api/webhooks/woocommerce/order`

## WordPress/WooCommerce setup

In WordPress admin:

1. Confirm WooCommerce is active.
2. Enable Cash on Delivery from WooCommerce payments.
3. Create WooCommerce REST API keys from WooCommerce settings.
4. Store those keys only in this backend's `.env` file or deployment secrets.
5. Create an order webhook pointing to `/api/webhooks/woocommerce/order`.

Never put WooCommerce consumer secrets in the React frontend or mobile app.
