# Gulefirdous MVP

This repository contains the Gulefirdous MVP migrated from the SolsGate
`cursor/gulefirdous-mvp-caad` branch.

**Continuing development with Cursor?** Read the full agent onboarding guide:
[`docs/CURSOR_AGENT_GUIDE.md`](docs/CURSOR_AGENT_GUIDE.md)

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

## Docker

Run both services with Docker Compose:

```
docker compose up --build
```

The frontend is served on `http://localhost:8080` and the backend listens on
`http://localhost:4000`.
