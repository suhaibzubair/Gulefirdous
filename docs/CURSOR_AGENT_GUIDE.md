# Gulefirdous — Cursor Agent Guide

Complete onboarding for new Cursor agents, developers, and cloud runs working on the **Gulefirdous** fragrance e-commerce MVP.

**Repository:** https://github.com/suhaibzubair/Gulefirdous  
**Live site:** https://gulefirdous.com  
**Stack:** React 18 (TypeScript) + Node.js HTTP API + WooCommerce REST API

---

## Table of contents

1. [What this project is](#1-what-this-project-is)
2. [Where code lives (GitHub vs local vs cloud agent)](#2-where-code-lives-github-vs-local-vs-cloud-agent)
3. [Branches and what to check out](#3-branches-and-what-to-check-out)
4. [Architecture](#4-architecture)
5. [Directory structure](#5-directory-structure)
6. [Local setup](#6-local-setup)
7. [WooCommerce API keys (secrets)](#7-woocommerce-api-keys-secrets)
8. [Environment variables](#8-environment-variables)
9. [Running dev servers](#9-running-dev-servers)
10. [Frontend features](#10-frontend-features)
11. [Backend API](#11-backend-api)
12. [WooCommerce publish flow](#12-woocommerce-publish-flow)
13. [WordPress shop / coming soon mode](#13-wordpress-shop--coming-soon-mode)
14. [Authentication](#14-authentication)
15. [Product images](#15-product-images)
16. [Testing](#16-testing)
17. [Docker](#17-docker)
18. [Git and PR workflow](#18-git-and-pr-workflow)
19. [Mock vs real features](#19-mock-vs-real-features)
20. [Troubleshooting](#20-troubleshooting)
21. [Agent checklist](#21-agent-checklist)

---

## 1. What this project is

Gulefirdous is a **mobile-first admin + client app** for a perfume brand. It lets an administrator:

- Create and publish products to **gulefirdous.com** (WooCommerce)
- Manage categories, images, and social ad copy
- View dashboard metrics (partially demo data)
- Track COD orders and TCS delivery (mock workflow)

Clients can browse products and place **Cash on Delivery** orders in the app UI.

The MVP was migrated from a SolsGate template repo. **Only `frontend/src/features/gulefirdous/` is active product code.** Other folders under `frontend/src/features/` are legacy and should not be refactored unless asked.

---

## 2. Where code lives (GitHub vs local vs cloud agent)

| Location | What is stored | Secrets? |
|----------|----------------|----------|
| **GitHub** | Source code, docs, `.env.example` | Never real API keys |
| **Developer PC** | `git clone` + local `backend/.env` | Yes — keys only here |
| **Cursor Cloud Agent VM** | Temporary `/workspace` clone | `.env` is local to VM; lost on reset |

**Important for the product owner:** The project is **not automatically on your PC**. Clone it:

```bash
git clone https://github.com/suhaibzubair/Gulefirdous.git
cd Gulefirdous
```

WooCommerce keys are **never** committed to GitHub. If WooCommerce only shows “Consumer key ending in …8a5cf71”, the **secret cannot be recovered** — create a new Read/Write API key in WordPress.

---

## 3. Branches and what to check out

| Branch | Use when |
|--------|----------|
| `main` | Stable baseline |
| `cursor/migrate-solsgate-gulefirdous-d9fc` | Older monolithic MVP (single scroll page, no login) |
| **`cursor/woocommerce-product-push-d9fc`** | **Recommended** — login, sidebar, WooCommerce publish, shop launch |
| `cursor/proper-login-system-d9fc` | Google + OTP auth (merged into WooCommerce branch) |
| `cursor/fix-broken-product-images-d9fc` | Image URL fixes |

**Open PR (draft):** [#9 — Publish products to gulefirdous.com WooCommerce](https://github.com/suhaibzubair/Gulefirdous/pull/9)

For most new agent work, start from:

```bash
git fetch origin
git checkout cursor/woocommerce-product-push-d9fc
```

Branch naming for new work: `cursor/<descriptive-name>-d9fc`

---

## 4. Architecture

```mermaid
flowchart TB
  subgraph browser [Browser :3000]
    UI[GulefirdousApp.tsx]
    Login[GulefirdousLogin.tsx]
    ApiClient[gulefirdousApi.ts]
  end

  subgraph backend [Node backend :4000]
    Server[server.js]
    WC[woocommerceClient.js]
    Vis[wordpressSiteVisibility.js]
    Cats[categoryStore.json]
  end

  subgraph wordpress [gulefirdous.com]
    Woo[WooCommerce REST v3]
    Shop[/shop catalog]
  end

  UI --> ApiClient
  Login --> UI
  ApiClient --> Server
  Server --> WC
  Server --> Vis
  Server --> Cats
  WC --> Woo
  Vis --> Woo
  Woo --> Shop
```

**Security rule:** WooCommerce consumer key/secret stay in `backend/.env` only. The React app never sees them.

---

## 5. Directory structure

```
Gulefirdous/
├── docs/
│   └── CURSOR_AGENT_GUIDE.md          ← this file
├── README.md
├── docker-compose.yml
├── backend/
│   ├── server.js                      # Entry; loads backend/.env
│   ├── .env.example                   # Template (commit this)
│   ├── .env                           # Real secrets (gitignored)
│   ├── data/categories.json           # Local category store (WooCommerce branch)
│   └── src/
│       ├── server.js                  # HTTP routes
│       ├── woocommerceClient.js       # WooCommerce REST client
│       ├── wordpressSiteVisibility.js # Disable coming-soon mode
│       ├── categoryStore.js           # Category CRUD
│       └── productImages.js           # Image pools (keep in sync with frontend)
└── frontend/
    ├── .env.example
    ├── package.json
    ├── jest.config.ts
    └── src/
        ├── App.tsx                    # Renders GulefirdousApp only
        └── features/gulefirdous/      # ★ All MVP code
            ├── GulefirdousApp.tsx     # Main shell + pages
            ├── GulefirdousLogin.tsx   # Google + phone OTP
            ├── GulefirdousDashboard.tsx
            ├── GulefirdousLogo.tsx
            ├── gulefirdousApi.ts      # Backend API client
            ├── gulefirdousNav.ts      # Routes, roles, nav items
            ├── authConfig.ts          # Admin email, role rules
            ├── authService.ts         # Firebase + mock auth
            ├── productImages.ts       # Stock photo pools
            ├── GulefirdousApp.scss
            └── assets/gulefirdous-logo.png
```

---

## 6. Local setup

### Prerequisites

- Node.js 18+ (backend), Node 16+ works for frontend CRA
- npm
- WooCommerce REST API keys (see section 7)

### Steps

```bash
# 1. Clone
git clone https://github.com/suhaibzubair/Gulefirdous.git
cd Gulefirdous
git checkout cursor/woocommerce-product-push-d9fc

# 2. Backend
cd backend
cp .env.example .env
# Edit .env — add real WooCommerce keys
npm install
npm test
npm start
# → http://localhost:4000

# 3. Frontend (new terminal)
cd frontend
npm install
npm test -- --watchAll=false
HOST=0.0.0.0 PORT=3000 npm start
# → http://localhost:3000
```

### Admin login (mock mode — default in tests)

| Method | Input | Role |
|--------|-------|------|
| Google | `suhaibzubair@gmail.com` | admin |
| Google | any other email | client |
| Phone OTP | any valid phone + any 6-digit code | client |

Admin email is configured in `authConfig.ts` only — not shown on the login UI.

---

## 7. WooCommerce API keys (secrets)

### Create keys in WordPress

1. https://gulefirdous.com/wp-admin/
2. **WooCommerce → Settings → Advanced → REST API**
3. **Add key** — Description: `Gulefirdous App`, User: Administrator, Permissions: **Read/Write**
4. Copy **Consumer key** (`ck_...`) and **Consumer secret** (`cs_...`) immediately

You cannot view the secret again. If lost, revoke the old key and create a new pair.

### Store keys locally only

Edit `backend/.env`:

```env
WOOCOMMERCE_SITE_URL=https://gulefirdous.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_full_key
WOOCOMMERCE_CONSUMER_SECRET=cs_your_full_secret
WOOCOMMERCE_WEBHOOK_SECRET=any_long_random_string
```

### Do NOT

- Commit `backend/.env` to GitHub (already in `.gitignore`)
- Put keys in `frontend/.env`
- Paste keys in PRs, issues, or chat logs

### For GitHub Actions / deployment

Use **GitHub → Settings → Secrets and variables → Actions** for `WOOCOMMERCE_CONSUMER_KEY`, etc.

### Verify keys work

```bash
curl http://localhost:4000/health
curl http://localhost:4000/api/products
```

A JSON list of products means keys are valid. An auth error means fix `.env` and restart backend.

---

## 8. Environment variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Default `4000` |
| `FRONTEND_ORIGIN` | No | CORS origin, default `http://localhost:3000` |
| `WOOCOMMERCE_SITE_URL` | Yes | `https://gulefirdous.com` |
| `WOOCOMMERCE_CONSUMER_KEY` | Yes | `ck_...` |
| `WOOCOMMERCE_CONSUMER_SECRET` | Yes | `cs_...` |
| `WOOCOMMERCE_WEBHOOK_SECRET` | For webhooks | HMAC secret |
| `ALLOW_LOCAL_CATEGORY_FALLBACK` | No | If `true`, save categories locally when WooCommerce fails |

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `REACT_APP_GULEFIRDOUS_API_BASE_URL` | Backend URL, default `http://localhost:4000` |
| `REACT_APP_AUTH_MODE` | `auto` \| `mock` \| `firebase` |
| `REACT_APP_FIREBASE_*` | Firebase config for production auth |

Tests force `REACT_APP_AUTH_MODE=mock` in `frontend/src/setupTests.ts`.

---

## 9. Running dev servers

| Service | Port | Command |
|---------|------|---------|
| Frontend (CRA) | 3000 | `cd frontend && HOST=0.0.0.0 PORT=3000 npm start` |
| Backend API | 4000 | `cd backend && npm start` |
| Docker frontend | 8080 | `docker compose up` |

### Cursor Cloud Agent / port forwarding

Forward ports **3000** and **4000** in the Cursor Ports panel. Both must be running:

```bash
# Backend (tmux example)
cd backend && npm start

# Frontend
cd frontend && HOST=0.0.0.0 PORT=3000 npm start
```

If the agent VM was reset: run `npm install` in both folders and recreate `backend/.env`.

### Health checks

```bash
curl http://localhost:4000/health
# {"ok":true,"service":"gulefirdous-backend"}

curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
# 200
```

---

## 10. Frontend features

### Admin pages (`gulefirdousNav.ts`)

| Page ID | Label | Notes |
|---------|-------|-------|
| `dashboard` | Dashboard | Chart.js KPIs (demo baselines + derived metrics) |
| `product-catalog` | Product catalog | Browse by category |
| `manage-categories` | Categories | API-backed category CRUD |
| `manage-products` | Manage products | Create, publish to WordPress |
| `social-ads` | Social ads | Mock Facebook/Instagram publish |
| `orders-delivery` | Orders & delivery | Mock COD + TCS tracking |
| `payments` | Payments | Referral coupon display |
| `account-settings` | Account settings | Profile placeholder |

### Client pages

| Page ID | Label |
|---------|-------|
| `shop` | Shop perfumes |
| `my-orders` | My orders |
| `track-delivery` | Track delivery |
| `account-settings` | Account settings |

### Key UI files

- **`GulefirdousApp.tsx`** — Main state, product CRUD, publish, orders, social mock
- **`GulefirdousLogin.tsx`** — Auth gate
- **`gulefirdousApi.ts`** — All backend calls
- **`productImages.ts`** — Image pools; must stay aligned with `backend/src/productImages.js`

---

## 11. Backend API

Base URL: `http://localhost:4000`

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/health` | Health check |
| `GET` | `/api/categories` | List categories |
| `POST` | `/api/categories` | Create category (+ optional WooCommerce sync) |
| `GET` | `/api/products` | List WooCommerce products |
| `POST` | `/api/products` | Create product (publish live) |
| `PUT` | `/api/products/:id` | Update existing product |
| `GET` | `/api/orders` | List WooCommerce orders |
| `PATCH` | `/api/orders/:id/status` | Update order status |
| `GET` | `/api/shop/status` | Coming-soon mode status |
| `POST` | `/api/shop/launch` | Disable coming-soon, show /shop catalog |
| `POST` | `/api/product-images/generate` | Server-side image batch (optional) |
| `POST` | `/api/webhooks/woocommerce/order` | Order webhook receiver |

CORS allows `FRONTEND_ORIGIN` (default `http://localhost:3000`).

---

## 12. WooCommerce publish flow

When admin clicks **Save & publish to WordPress**:

1. `GulefirdousApp.tsx` → `publishProductToWordPress()`
2. `gulefirdousApi.ts` → `buildWooProductPayload()` + `publishWooProduct()`
3. `POST` or `PUT` `/api/products` on backend
4. Backend `sanitizeProduct()` sets:
   - `status: "publish"`
   - `catalog_visibility: "visible"`
   - `stock_status: "instock"` (when stock > 0)
5. `woocommerceClient.js` → `https://gulefirdous.com/wp-json/wc/v3/products`
6. Backend calls `launchStore()` to disable WooCommerce **coming soon** mode
7. Frontend stores `wooCommerceId` + real `permalink`

On **admin login**, `fetchWooProducts()` merges live catalog so “Live on …” links persist after refresh.

### Image rules for WooCommerce

| Image source | WooCommerce upload |
|--------------|-------------------|
| Pexels URLs | Usually works |
| Unsplash URLs with query params | Often rejected — product publishes without image |
| Mobile gallery (`blob:` URLs) | Not uploaded — publish without image |

### Product URL format

Live link example: `https://gulefirdous.com/product/gulefirdous-bloom-mist/`

---

## 13. WordPress shop / coming soon mode

WooCommerce can enable **Coming soon** mode, which hides `/shop` even when products exist.

**Symptom:** `/shop` shows “Something big is brewing… launching soon” but direct product URLs work.

**Fix (automatic):** Publishing a product calls `POST /api/shop/launch` via `wordpressSiteVisibility.js`.

**Fix (manual in WordPress):**

1. **WooCommerce → Settings → Site visibility**
2. Select **Live** (not Coming soon)
3. Save

**Verify:**

```bash
curl http://localhost:4000/api/shop/status
# comingSoon: false

# Shop page should list products:
# https://gulefirdous.com/shop/
```

---

## 14. Authentication

### Mock mode (local dev + tests)

Set `REACT_APP_AUTH_MODE=mock` or leave Firebase keys empty with `auto`.

### Firebase mode (production)

1. Create Firebase project
2. Enable Google + Phone sign-in
3. Fill `frontend/.env` with `REACT_APP_FIREBASE_*`
4. Set `REACT_APP_AUTH_MODE=firebase`

### Role resolution (`authConfig.ts`)

- Admin: `suhaibzubair@gmail.com` (Google only)
- Everyone else: client

---

## 15. Product images

- **Pools:** Perfume, Gift Set, Attar, Body Mist, Candles (WooCommerce branch)
- **Sources:** Curated Unsplash/Pexels URLs labeled “AI generated”
- **Fallback:** `handleProductImageError()` swaps broken images
- **Sync rule:** When editing pools, update **both**:
  - `frontend/src/features/gulefirdous/productImages.ts`
  - `backend/src/productImages.js`

Verify URLs return HTTP 200 before committing new images.

---

## 16. Testing

```bash
# Backend (Node test runner)
cd backend && npm test
# Expected: 16 tests (WooCommerce branch)

# Frontend (Jest)
cd frontend && npm test -- --watchAll=false
# Expected: 20 tests (WooCommerce branch)

# Production build
cd frontend && npm run build
```

`frontend/jest.config.ts` loads `frontend/src/setupTests.ts` which mocks fetch for categories/products API.

### What tests cover

- Admin login (mock Google)
- Product CRUD + duplicate detection
- Image generation + gallery upload
- Social ad caption edit + mock publish
- COD orders
- WooCommerce sync on login (WooCommerce branch)
- API merge helpers (`gulefirdousApi.test.ts`)

---

## 17. Docker

```bash
# From repo root — requires host env vars for WooCommerce
export WOOCOMMERCE_SITE_URL=https://gulefirdous.com
export WOOCOMMERCE_CONSUMER_KEY=ck_...
export WOOCOMMERCE_CONSUMER_SECRET=cs_...
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend (nginx) | http://localhost:8080 |
| Backend | http://localhost:4000 |

---

## 18. Git and PR workflow

1. Branch from latest feature branch: `cursor/<name>-d9fc`
2. Make focused changes — avoid refactoring legacy SolsGate code
3. Run backend + frontend tests
4. Commit with clear messages
5. Push and open draft PR to appropriate base (`main` or feature branch)
6. Never commit `.env` files

---

## 19. Mock vs real features

| Feature | Status |
|---------|--------|
| WooCommerce product publish | **Real** (with valid backend `.env`) |
| Shop catalog on /shop | **Real** (after coming-soon disabled) |
| Category API | **Real** (local JSON + optional Woo sync) |
| Product list sync on admin login | **Real** |
| Social Facebook/Instagram posts | **Mock** (local state only) |
| Orders in app UI | **Mock** (in-memory) |
| TCS tracking numbers | **Mock** (random) |
| Dashboard revenue baselines | **Mock** + derived from local orders |
| Gallery image → WordPress media | **Not implemented** |
| WooCommerce order pull into app | **Not wired to UI** |
| Real Firebase in production | **Optional** (needs Firebase project) |

---

## 20. Troubleshooting

### “Publish to WordPress” fails

- Is backend running on 4000?
- Are `WOOCOMMERCE_*` keys real (not `ck_replace_me`)?
- Restart backend after editing `.env`

### Products show “not published” after refresh

- Use `cursor/woocommerce-product-push-d9fc` branch (catalog merge on login)
- Backend must be reachable when admin signs in

### `/shop` still shows coming soon

```bash
curl -X POST http://localhost:4000/api/shop/launch
```

Or fix in WordPress: WooCommerce → Settings → Site visibility → Live

### Port 3000 connection refused (Cursor)

- Start frontend with `HOST=0.0.0.0 PORT=3000 npm start`
- Forward port 3000 in Cursor Ports panel

### Agent machine “not running”

Cloud VM resets wipe `node_modules` and `.env`:

```bash
cd backend && npm install && cp .env.example .env  # re-add keys
cd frontend && npm install
# restart both servers
```

### ESLint build error `GulefirdousLogo is not defined`

Use default import in `GulefirdousApp.tsx`:

```ts
import GulefirdousLogo from "./GulefirdousLogo";
```

### Broken product thumbnails

- Replace dead URLs in `productImages.ts` / `productImages.js`
- Use `handleProductImageError` on `<img>` tags

---

## 21. Agent checklist

Before starting work:

- [ ] Confirm which branch to use (`woocommerce-product-push-d9fc` for full stack)
- [ ] `backend/.env` has real WooCommerce keys (or document that publish will fail)
- [ ] Backend on :4000, frontend on :3000
- [ ] `curl http://localhost:4000/health` returns OK

Before committing:

- [ ] `cd backend && npm test`
- [ ] `cd frontend && npm test -- --watchAll=false`
- [ ] `cd frontend && npm run build` (if UI changed)
- [ ] No secrets in diff
- [ ] `productImages.ts` and `productImages.js` still in sync (if images changed)

Before telling user “publish works”:

- [ ] `curl http://localhost:4000/api/products` returns products
- [ ] Published product URL opens on gulefirdous.com
- [ ] https://gulefirdous.com/shop/ shows product grid (not coming soon)

---

## Quick reference commands

```bash
# Full dev stack
cd backend && npm start
cd frontend && HOST=0.0.0.0 PORT=3000 npm start

# Test publish path manually
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Agent Test Product","price":1,"stock_quantity":1,"description":"Safe to delete"}'

# Launch shop
curl -X POST http://localhost:4000/api/shop/launch

# Shop status
curl http://localhost:4000/api/shop/status
```

---

*Last updated for branch `cursor/woocommerce-product-push-d9fc` and PR #9.*
