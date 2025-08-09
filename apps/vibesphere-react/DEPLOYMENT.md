# VibeSphere (React + Vite) — Deployment Guide

This guide covers deploying the React frontend (Vite) and the Stripe Checkout server.

## 1) Prerequisites
- Node.js 18+
- Stripe account (test keys)
- (Optional) Firebase project for Auth/Firestore/Storage
- Hosting options: Vercel/Netlify/Cloudflare Pages for frontend; Render/Fly/Heroku/Cloudflare Workers (or your server) for Stripe endpoint

## 2) Environment Variables
Create apps/vibesphere-react/.env with:
```
# Frontend
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
# If your Stripe server is not same-origin, set API base URL
VITE_API_BASE_URL=https://stripe-server.example.com

# Firebase (optional)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 3) Build Frontend
```
cd apps/vibesphere-react
npm install
npm run build
```
This produces a `dist/` folder. Deploy it to your static hosting (Vercel/Netlify/etc.).

### Vercel
- Import the repo in Vercel, set the above env vars in Project Settings → Environment Variables.
- Build command: `npm run build`
- Output directory: `apps/vibesphere-react/dist`
- Install command: `npm install`

### Netlify
- Build command: `npm run build --prefix apps/vibesphere-react`
- Publish directory: `apps/vibesphere-react/dist`
- Environment: add variables under Site settings → Build & deploy → Environment.

## 4) Stripe Checkout Server
The sample server is located at `apps/vibesphere-react/server/index.mjs` (Express).

### Local run (dev)
```
cd apps/vibesphere-react/server
STRIPE_SECRET_KEY=sk_test_... \
SUCCESS_URL=http://localhost:5173/booking?status=success \
CANCEL_URL=http://localhost:5173/booking?status=cancel \
node index.mjs
```

### Deploying the server
Pick a host (Render/Fly/Heroku/Railway). Create a service with:
- Node 18 runtime
- Start command: `node index.mjs`
- Env Vars: STRIPE_SECRET_KEY, SUCCESS_URL, CANCEL_URL
- Expose port (default 8787)

Once deployed, set the frontend `VITE_API_BASE_URL` to this server’s base URL.

## 5) Firebase (Optional)
- In Firebase Console, enable Auth (Google), Firestore, and Storage.
- Copy web config into the VITE_FIREBASE_* env vars.
- Security Rules: ensure only creators can manage their events, and bookings are read by the correct parties.

## 6) Testing Checklist
- Pages load: /, /explore, /event/:id, /packages, /booking, /auth, /creator, /dashboard
- Stripe: Navigate to booking step 4, ensure Checkout redirects and returns to SUCCESS_URL/CANCEL_URL
- Firebase: Sign in via /auth, create event at /creator/new, verify /creator/events and /explore reflect data
- Favorites: Save on /explore and view on /dashboard

## 7) Production Considerations
- Add GA4 gtag script to index.html or a higher-level layout wrapper; ensure track() uses gtag
- Set canonical URLs and meta tags (title/description) per route (consider a meta manager)
- Optimize images (WebP) and configure a CDN
- Configure CORS on Stripe server to frontend origin
- Enforce HTTPS
- Set proper cache headers for static assets

## 8) Troubleshooting
- 404s on deep links: Configure SPA fallback (Netlify redirect to /index.html, Vercel rewrites) for `apps/vibesphere-react/dist`.
- Stripe errors: Verify server logs; confirm publishable and secret keys; check VITE_API_BASE_URL.
- Firebase not initializing: Ensure all VITE_FIREBASE_* are set and match your project; check browser console for errors.

## 9) Next Steps
- Add e2e tests (Playwright/Cypress)
- Add CI to build and run tests on PRs
- Harden Firebase Security Rules and add role-based access controls
- Add Sentry or similar monitoring for errors

