# Gulefirdous MVP

This repository contains the Gulefirdous MVP migrated from the SolsGate
`cursor/gulefirdous-mvp-caad` branch.

- A React MVP dashboard for product drafts, Facebook/Instagram publishing actions,
  COD ordering, TCS tracking, referrals, and source analytics.
- A Node backend proxy under `backend/` for secure WooCommerce product/order sync.

WordPress status checked on `gulefirdous.com`:

- WooCommerce is installed and active.
- Cash on Delivery is enabled.
- Store country/currency are still set to United States/USD and should only be
  changed after confirming the correct base country and currency.

Do not place WooCommerce API secrets in the frontend. Store them in backend
environment variables using `backend/.env.example` as the template.

## Local development

Run the backend:

```
cd backend
cp .env.example .env
npm test
npm start
```

Run the frontend:

```
cd frontend
npm install
npm test
npm run build
npm start
```

Open `http://localhost:3000` in your browser.

## Authentication

Login supports **Google** and **mobile OTP**. The app assigns administrator or client access automatically after sign-in based on the authenticated account.

For local development/tests without Firebase, auth runs in **mock mode** automatically.
To enable real Google + OTP in production, copy `frontend/.env.example` to `frontend/.env`
and add your Firebase project keys. In Firebase Console, enable **Google** and **Phone**
authentication providers.

## Docker

Run both services with Docker Compose:

```
docker compose up --build
```

The frontend is served on `http://localhost:8080` and the backend listens on
`http://localhost:4000`.
