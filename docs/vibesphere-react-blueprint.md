# VibeSphere (React) — End‑to‑End Product + Build Blueprint

This single document captures the complete product spec (Steps 1–15) and a practical plan to build VibeSphere from scratch using React (Vite + TypeScript). It includes brand/design tokens, page/flow specs, data model, accessibility, analytics, and a file‑by‑file build order.

---

## Step 1 — Project Overview & Goals
- Purpose: Conversion‑focused portfolio + booking platform for event creators. Cinematic, premium, trustworthy.
- Audiences: Customers (discover + book), Event Creators (showcase + receive inquiries), Public viewers.
- KPIs: CR ≥ 8%, time‑to‑inquiry ≤ 2 min, ≥ 65% mobile engagement, WCAG AA.

## Step 2 — Brand & Visual System
- Color (CSS variables; ensure ≥4.5:1 contrast for body text; provide alt tokens where needed):
  - --primary-900: #0F1230 (deep navy)
  - --accent-500: #FF6F61 (vibrant coral)
  - --muted-100: #F6F7FB (soft white)
  - --gold-400: #FFD166 (accent gold)
  - --neutral-600: #6B7280 (neutral text)
  - Accessibility helpers:
    - --primary-950: #0A0C22, --neutral-800: #1F2937, --muted-000: #FFFFFF
- Typography (Google Fonts):
  - Headings: Playfair Display (serif)
  - Body: Inter (sans)
  - Scale (rem @16px base): H1 3rem/1.15, H2 2.125rem/1.2, H3 1.5rem/1.3, Body 1rem/1.6, Small 0.875rem/1.5
  - Letter‑spacing tokens: --ls-tight:-0.01em, --ls-normal:0, --ls-wide:0.02em
- Spacing & Radius:
  - 4/8 grid (4px unit): 4,8,12,16,20,24,32,40,48,64
  - Radius: 12px default, 20px featured cards
  - Shadows: --shadow-card: 0 4px 24px rgba(0,0,0,0.08), --shadow-elevated: 0 10px 30px rgba(0,0,0,0.12)
- Iconography: 40 core icons (outline+filled) as SVG sprite (search, calendar, booking, chat, share, favorite, play, download, filter, sort, location, clock, users, price, star, heart, plus, minus, upload, image, video, ticket, qr, phone, mail, message, lock, shield, settings, dashboard, bell, globe, language, microphone, send, map, pin, refresh, chevron, close). Provide in /public/icons/sprite.svg and Figma components.
- Photography Style: Cinematic, shallow depth‑of‑field, warm lighting. 12 hero placeholders:
  - /assets/heroes/wedding-{1..3}.jpg, /corporate-{1..3}.jpg, /party-{1..3}.jpg, /festival-{1..3}.jpg
- Motion:
  - Micro‑interactions: 120–200ms ease‑out; page transitions 250–400ms fade+slide
  - Portfolio hover: scale(1.04) + gradient overlay + caption fade
  - Reduce‑motion: respect prefers‑reduced‑motion; disable transforms, use fades
- Deliverables: SVG logo variations, color tokens, typography kit, Figma system, exportable components

## Step 3 — Core Pages & Flows (spec)
- Homepage
  - Hero full‑bleed carousel (3 curated events), headline + teaser + CTA “Explore This Style”, subtle parallax
  - Sticky Quick Filters: type, date range, budget, location (persist on scroll)
  - Featured Portfolios carousel; Social proof strip; CTAs: Book a Consultation (primary), View Packages (secondary)
  - Analytics: homepage_loaded, hero_cta_click
- Explore / Gallery Grid
  - Masonry grid; card: image, badges, caption, View Story, favorite; hover: guests/budget + Book Similar
  - Filters/Sort in left panel (desktop) or top sheet (mobile); persist via URL params; ARIA + keyboard nav
- Event Story / Experience (single event)
  - Hero + summary (type, date, location, guests, budget); alternating story sections; Before/After slider
  - Media gallery (photos + short reel); Packages for style; sticky “Book This” CTA
  - Testimonials, vendor credits; Similar Looks carousel; social share
  - SEO: schema.org/Event data attributes
- Package & Pricing
  - Three tiers (Basic/Premium/Luxe) with inclusions, add‑ons, turnaround, deposit %
  - Comparison table; download brochure (PDF); mini budget calculator (guest count + add‑ons)
- Booking & Inquiry Flow (MVP)
  - Step 1 package → Step 2 date/time (calendar blocked dates) → Step 3 details/preferences → Step 4 confirmation + secure deposit
  - Display total, deposit, cancellation policy; back nav + autosave draft; optional Firebase Auth; Firestore bookings; Stripe/placeholder
  - Analytics: booking_started, booking_completed, booking_abandoned
- Creator Portfolio Admin (creators only)
  - Upload wizard (images/video, tags, B/A images), story text, package link; status Draft/Published/Featured
  - Booking leads inbox (Message/Accept/Decline)
- User Dashboard (customer)
  - Upcoming bookings, past events, saved looks, recommendations; downloads; chat to AI or creator; settings (notifications, calendar sync, language, a11y)
- Public Events / Ticketing (optional)
  - Listings, ticket tiers, seat maps, e‑ticket QR; livestream + replay
- Footer/Legal: privacy, T&Cs, vendor terms, contact, social, newsletter double opt‑in

## Step 4 — Component Library & Interaction
- Atomic components: Button, Input, Select, Textarea, Checkbox/Radio, Datepicker (blocked), Timepicker, Modal/Drawer, Toast, Card, Accordion, Tabs, Slider (Before/After), File Uploader (drag/drop), Media Player, Chat Widget
- Accessibility: ARIA roles, labels/ids, focus ring (2px outline), tab order, ESC to close, Arrow keys for menus, 4.5:1 contrast
- State diagrams (booking): idle → validating → loading → success | error; microcopy for each state (e.g., empty: “No events found — try widening your dates or exploring our curated looks.”)

## Step 5 — AI Assistant Chat (Vibe)
- Placement: Persistent chat bubble (BR desktop; bottom center mobile), compact mode with unread badge; modal on expand
- Header with Vibe logo, message list, input, quick actions (Book Now, View Packages, Contact Creator); optional voice input + emoji
- Tone: Warm, professional, concise. Opening: “Hi — I’m Vibe, your event concierge! Looking to browse styles, book a consultation, or get recommendations?”
- Intents: discovery, style match, booking, pricing/packages, creator contact, live help, post‑booking changes; fallback → human handoff
- UX: suggested quick replies, rich cards, inline booking (prefilled), short session history, email transcript export
- Integration: OpenAI + domain retrieval (Firestore: events, packages, bookings, users, faqs). Mask PII. CF: create_booking_from_chat
- Handoff: “Connect to human” → support_threads; notify creator; log handoff
- Testing: 20+ scripted prompts; accept criteria to resolve to correct actions

## Step 6 — Firebase Architecture & Data Model
- Collections (examples):
  - users/{uid}: {name,email,role,locale,preferences{language,accessibility}}
  - events/{eventId}: {title,type,dateStart,dateEnd,location{city,geo},tags[],heroImage,gallery[],story,packages[]}
  - packages/{packageId}: {name,priceRange,inclusions[],addOns[]}
  - bookings/{bookingId}: {userId,eventId,packageId,date,status,payment{status,amount}}
  - creators/{creatorId}: {profile,portfolio[],leadScore}
  - faqs/{faqId}, support_threads/{threadId}, analytics_events/{id}
- Storage: images/events/{eventId}/, videos/events/{eventId}/, docs/brochures/{eventId}.pdf
- Rules (high‑level): creators write their own content; bookings created by authed users; creators read bookings for their events only
- Cloud Functions: onBookingCreate (email/WhatsApp + QR + availability), onEventPublish (image optimization + OG), chatToBooking (intent→provisional booking)
- Live chat: Firestore or RTDB; batched writes for comments

## Step 7 — Performance, SEO & Analytics
- Performance: WebP, srcset, lazy‑load; inline critical CSS; defer non‑critical fonts; Lighthouse targets P≥85, A≥90, BP≥90
- SEO: SSR/prerender key pages; schema.org Event + LocalBusiness; OG + Twitter cards; canonicals
- Analytics: GA4 + Firebase; events: event_view, package_view, booking_initiated, booking_completed, chat_initiated, chat_booking_confirmed; Hotjar for 2 weeks; Looker Studio funnels

## Step 8 — Accessibility & Internationalization
- WCAG AA: keyboard nav, focus states, semantic HTML, skip links, ARIA landmarks; image alts; label associations
- i18n: English + one local language; locale files; date/time formats; rem‑based scaling; respect zoom

## Step 9 — Mobile & Multi‑Device UX
- Breakpoints: ≤640 mobile, 641–1024 tablet, ≥1025 desktop
- Mobile bottom nav (5 tabs): Explore, Bookings, Vibe, Saved, Profile
- Offline: cache portfolios; “Limited for offline” banners; graceful fallbacks

## Step 10 — Security & Privacy
- Auth: Firebase Auth (email/pw, Google; optional magic link)
- Payments: Stripe Checkout (hosted); never store card data
- LLM privacy: mask PII; do not send payment or full identifiers
- GDPR/CCPA: cookie consent, data export/delete endpoints

## Step 11 — Content Strategy & Microcopy
- Tone: premium, warm, confident
- Examples: Hero CTA “Browse Signature Experiences”; Booking button “Reserve This Experience”; Empty: “No matches — try expanding dates or budget”
- Blog & Inspiration: 12 seed articles for SEO (how‑to, trends)

## Step 12 — QA, Testing & Acceptance
- Design QA (desktop+mobile), cross‑browser
- Functional QA: booking with Stripe test, chat flows (≥30 prompts), uploads
- Accessibility QA: axe‑core + manual keyboard‑only
- Performance QA: Lighthouse targets
- Acceptance: browse → book → pay → confirm; chat handoff; admin lead display

## Step 13 — Deliverables & Handoff
- Figma prototype + tokens + redlines; SVG assets
- Storybook for React components; Tailwind or CSS variables
- API Spec: OpenAPI/Postman (GET /events, POST /bookings, POST /chat/intent, GET /creators/{id}/portfolio)
- Deployment: Firebase Hosting + GitHub Actions; prod/stage configs; 4‑week support

## Step 14 — Timeline & Priorities
- MVP (6–8 weeks): Homepage, Explore, Event Story, Booking Flow, Customer Dashboard, Creator Admin (basic), AI Chat (basic), Firebase backend, Stripe test
- Phase 2: live streams, marketplace, gamification, advanced RAG chat, analytics

## Step 15 — Final Notes
- Ethos: Luxury brochure × intuitive SaaS
- Deliver in implementation‑ready formats; maintain annotated prototypes
- Communication: daily standup, weekly design review

---

# Build From Scratch (React + Vite + TS) — File‑by‑File Plan

Use Vite for speed and TS for safety. Tailwind or CSS variables (below uses CSS variables + utility helpers).

## Scaffold
1) npm create vite@latest vibesphere -- --template react-ts
2) cd vibesphere && npm i
3) npm i react-router-dom framer-motion clsx zod date-fns firebase stripe @stripe/stripe-js
4) Dev tools: npm i -D vite-tsconfig-paths eslint prettier jest @testing-library/react @testing-library/jest-dom

## Directory Structure
```
src/
  assets/ (images, icons)
  components/
    ui/ (atomic)
    booking/
    chat/
    cards/
    layout/
  hooks/
  lib/ (firebase, stripe, analytics)
  pages/ (route components)
  routes/ (router config)
  styles/ (tokens.css, global.css)
  types/
  app.tsx
  main.tsx
```

## Initial Files (with snippets)
- File 1: src/styles/tokens.css
  - CSS variables for colors, typography, spacing, shadows, motion
- File 2: src/styles/global.css
  - Normalize, base styles, focus rings, reduced‑motion
- File 3: src/main.tsx
  - ReactDOM createRoot + RouterProvider
- File 4: src/app.tsx
  - Layout shell, Navbar, Footer, Routes
- File 5: src/components/ui/Button.tsx
  - Variants: primary/secondary/ghost + loading + ARIA
- File 6: src/components/ui/Input.tsx
  - Label/description/error; aria‑describedby
- File 7: src/components/ui/Card.tsx
  - Card/Content/Header composables
- File 8: src/pages/Home.tsx
  - Hero carousel, quick filters (sticky), featured, proof, CTAs
- File 9: src/pages/Explore.tsx
  - Masonry grid + filters panel + URL params
- File 10: src/pages/EventStory.tsx
  - Story layout + B/A slider + packages + sticky CTA
- File 11: src/pages/Packages.tsx
  - Three tiers + comparison + mini calculator
- File 12: src/pages/Booking/index.tsx (+ steps)
  - Step1 Package, Step2 Calendar, Step3 Details, Step4 Confirm
- File 13: src/components/chat/VibeWidget.tsx
  - Bubble + modal + intents wiring (mock first)
- File 14: src/lib/firebase.ts
  - Initialize app, auth, firestore, storage
- File 15: src/lib/analytics.ts
  - GA4 + custom event helpers

## Starter Snippets (copy into files)

1) tokens.css
```
:root{
  --primary-900:#0F1230;--primary-950:#0A0C22;--accent-500:#FF6F61;--gold-400:#FFD166;
  --muted-000:#FFFFFF;--muted-100:#F6F7FB;--neutral-600:#6B7280;--neutral-800:#1F2937;
  --radius-lg:12px;--radius-xl:20px;--shadow-card:0 4px 24px rgba(0,0,0,.08);
  --shadow-elevated:0 10px 30px rgba(0,0,0,.12);
  --font-display:'Playfair Display',serif;--font-body:Inter,system-ui;
  --h1:3rem;--h2:2.125rem;--h3:1.5rem;--body:1rem;--small:.875rem;--lh-1:1.15;--lh-2:1.2;--lh-3:1.3;--lh-body:1.6;
  --ls-tight:-.01em;--ls-normal:0;--ls-wide:.02em;--ease: cubic-bezier(.2,.8,.2,1);
}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}
```

2) global.css
```
*{box-sizing:border-box}html,body,#root{height:100%}body{margin:0;font-family:var(--font-body);
  color:var(--neutral-800);background:var(--muted-100)}
:focus-visible{outline:2px solid var(--accent-500);outline-offset:2px}
h1{font-family:var(--font-display);font-size:var(--h1);line-height:var(--lh-1);letter-spacing:var(--ls-tight)}
h2{font-family:var(--font-display);font-size:var(--h2);line-height:var(--lh-2)}
h3{font-family:var(--font-display);font-size:var(--h3);line-height:var(--lh-3)}
p{font-size:var(--body);line-height:var(--lh-body)}
```

3) main.tsx
```
import React from 'react';import ReactDOM from 'react-dom/client';import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/tokens.css';import './styles/global.css';import App from './app';
import Home from './pages/Home';import Explore from './pages/Explore';
const router=createBrowserRouter([{path:'/',element:<App/>,children:[{index:true,element:<Home/>},{path:'explore',element:<Explore/>}]}]);
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><RouterProvider router={router}/></React.StrictMode>);
```

4) app.tsx
```
import { Outlet } from 'react-router-dom';
export default function App(){return(<div style={{minHeight:'100%'}}><header style={{padding:16}}><a href="/" aria-label="VibeSphere Home">VibeSphere</a></header><main><Outlet/></main><footer style={{padding:16}}>© VibeSphere</footer></div>)}
```

5) Button.tsx
```
import clsx from 'clsx';
export function Button({variant='primary',loading,children,...props}:{variant?:'primary'|'secondary'|'ghost';loading?:boolean}&React.ButtonHTMLAttributes<HTMLButtonElement>){
  return(<button {...props} className={clsx('btn',variant,props.className)} aria-busy={loading}>
    {loading?'Loading…':children}
  </button>)}
```

6) Home.tsx (hero + CTA stub)
```
export default function Home(){return(<section style={{padding:24}}>
  <h1>Where Every Moment Finds Its Vibe</h1>
  <p>Browse signature experiences and reserve your date.</p>
  <a href="/explore" aria-label="Explore styles">Explore This Style →</a>
</section>)}
```

## Data Layer (Mock → Firebase)
- Start with JSON mocks in /src/mocks, then replace with Firestore queries.
- Firebase init in src/lib/firebase.ts; create hooks (useEvents, usePackages, useBookingDraft).

## Payments (Stripe)
- Use Stripe Checkout (test keys) for deposit; redirect flow; webhook (Cloud Function) to mark payment status.

## Analytics
- src/lib/analytics.ts: page + event helpers, consent handling; fire events on key CTAs.

## Testing
- Unit tests for components; integration: booking flow; a11y via @testing-library/jest-dom + axe (optional).

---

If you want, I can now scaffold the repo structure and commit these starter files, or expand any section (e.g., detailed wireframes, Storybook tokens, or Firestore rules).
