# VibeSphere (React + Vite + TS)

This is the fresh React implementation of VibeSphere from scratch using Vite + TypeScript. It follows the product blueprint in ../../docs/vibesphere-react-blueprint.md

## Prerequisites
- Node.js 18+
- npm 8+

## Install & Run
```bash
cd apps/vibesphere-react
npm install
npm run dev
```
Then open http://localhost:5173

## Build & Preview
```bash
npm run build
npm run preview
```

## Payments (Stripe Test Server)
Create a local server for Checkout sessions:
```bash
# Terminal A (app)
npm run dev

# Terminal B (stripe server)
cd server
STRIPE_SECRET_KEY=sk_test_... SUCCESS_URL=http://localhost:5173/booking?status=success CANCEL_URL=http://localhost:5173/booking?status=cancel node index.mjs
```
Ensure you set VITE_STRIPE_PUBLISHABLE_KEY in a .env file at project root and restart dev server.

## Next Steps
- Wire real data (Firebase) in src/lib/firebase.ts and create hooks
- Implement accessibility checks (axe) and analytics (GA4)
- Expand Creator/Admin & Customer dashboards
- Add tests and deployment guide
```

