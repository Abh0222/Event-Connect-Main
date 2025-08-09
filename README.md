# VibeSphere - Where Every Moment Finds Its Vibe

A premium event creation and booking platform built with Next.js, TypeScript, and Firebase.

## 🚀 Features

- **Premium Design System**: Custom color palette, typography, and components
- **Hero Carousel**: Full-screen image carousel with parallax effects
- **Event Discovery**: Advanced filtering and search capabilities
- **Portfolio Showcase**: Masonry grid layout with hover effects
- **Booking System**: Multi-step booking flow with payment integration
- **AI Assistant**: Chat-based booking assistance and recommendations
- **Creator Dashboard**: Portfolio management and lead tracking
- **Mobile Responsive**: Optimized for all device sizes
- **Accessibility**: WCAG AA compliant with keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Backend**: Firebase (Firestore, Auth, Storage, Functions)
- **Payments**: Stripe
- **AI**: OpenAI integration for chat assistant
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installing Node.js

1. **Windows**: Download from [nodejs.org](https://nodejs.org/) and run the installer
2. **macOS**: Use Homebrew: `brew install node` or download from nodejs.org
3. **Linux**: Use your package manager or download from nodejs.org

Verify installation:
```bash
node --version
npm --version
```

## 🚀 Getting Started

1. **Clone the repository** (if using Git):
   ```bash
   git clone <repository-url>
   cd vibesphere
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...

   # OpenAI Configuration
   OPENAI_API_KEY=sk-...
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # Reusable UI components
│   │   └── Button.tsx     # Button component with variants
│   └── sections/          # Page sections
│       ├── Hero.tsx       # Hero carousel component
│       ├── QuickFilters.tsx
│       ├── FeaturedPortfolios.tsx
│       └── SocialProof.tsx
├── lib/
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript type definitions
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep navy (#0F1230) for text and backgrounds
- **Accent**: Vibrant coral (#FF6F61) for CTAs and highlights
- **Muted**: Soft white (#F6F7FB) for backgrounds
- **Gold**: Accent gold (#FFD166) for special elements
- **Neutral**: Gray tones (#6B7280) for secondary text

### Typography
- **Display Font**: Playfair Display (serif) for headings
- **Body Font**: Inter (sans-serif) for body text
- **Scale**: 48px, 34px, 24px, 16px, 14px with proper line heights

### Components
All components include:
- Accessibility features (ARIA labels, keyboard navigation)
- Focus states with visible focus rings
- Responsive design
- Dark mode support (planned)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Vercel (Alternative)
1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel`

## 📱 Features Roadmap

### Phase 1 (MVP) - ✅ Current
- [x] Homepage with hero carousel
- [x] Quick filters bar
- [x] Featured portfolios grid
- [x] Social proof section
- [x] Responsive design
- [x] Basic component library

### Phase 2 (In Progress)
- [ ] Event detail pages
- [ ] Booking flow
- [ ] User authentication
- [ ] Creator dashboard
- [ ] AI chat assistant

### Phase 3 (Advanced)
- [ ] Payment integration
- [ ] Live streaming
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] PWA features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. **Check the console** for error messages
2. **Verify Node.js version** (18+ required)
3. **Clear node_modules** and reinstall: `rm -rf node_modules && npm install`
4. **Check environment variables** are properly set
5. **Review Firebase configuration** if using backend features

For additional help, please open an issue in the repository.

---

**VibeSphere** - Crafting unforgettable experiences, one event at a time. ✨
