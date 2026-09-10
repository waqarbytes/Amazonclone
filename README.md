# Amazon Rebuild — Fast, Intuitive E-Commerce

> **Disclaimer**: This is an independent, open-source e-commerce demonstration project created as part of an engineering assignment. It is **not affiliated with, endorsed by, or sponsored by Amazon.com, Inc.** or any of its subsidiaries. All brand names, trademarks, and logos are the property of their respective owners.

A modern, high-performance e-commerce shopping experience inspired by proven Amazon storefront patterns, re-architected with cleaner navigation, instant client-side search and filtering, transparent deterministic recommendations, and a streamlined 3-step checkout funnel.

---

## Live Production & Repository Links

- **Live Production URL**: [(https://amazonclone4348.netlify.app/)]
- **Public GitHub Repository**: [https://github.com/waqarbytes/Amazonclone)

---

## Tech Stack

- **Core Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 6
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: Tailwind CSS v3 with tailored design tokens (`amazon-dark`, `amazon-amber`, `amazon-deal`, etc.)
- **Icons**: Lucide React
- **Testing & Verification**: Playwright (E2E) + TSX/Node automated verification suites for M2 through M6
- **Persistence**: Safe `localStorage` data layer with schema versioning and corrupted state recovery

---

## Key Features & UX Differentiators

1. **Hero Background Slider**:
   - Dynamic crossfading background showcasing 5 core categories (Electronics, Home, Fashion, Books, Beauty).
   - Balanced two-sided horizontal navy scrim ($65\%\to35\%\to20\%$) ensuring vibrant photography alongside crisp headline readability.
   - Accessible pagination dots, 4.5s autoplay, hover/focus pause, and `prefers-reduced-motion` compliance.

2. **Intent-Driven Search & Discovery**:
   - Multi-category autocomplete grouping Categories, Brands, and Products with full keyboard navigation (Up/Down/Enter/Escape).
   - Instant client-side filtering by Department, Offers (Deals/Prime), Brands, Review Ratings, and Price Range with zero layout shift.
   - Active filter tags with single-click dismiss and "Clear All".
   - 3-column grid and detailed list view toggles.

3. **Premium Product Detail Experience**:
   - High-resolution interactive image gallery with hover magnification.
   - Sticky buy box with live stock indicators, delivery estimation, and quantity stepper.
   - Verified customer review breakdown and dynamic star distributions.
   - Side-by-side Product Comparison matrix comparing 3 closely matched category alternatives.

4. **Streamlined 3-Step Checkout Funnel**:
   - Unified single-page checkout replacing multi-page friction.
   - Step 1: Saved delivery address book (Add, Edit, Default).
   - Step 2: Transparent delivery speeds (Free Prime, Free Standard, Priority Express).
   - Step 3: Payment selection (Card, UPI, Cash on Delivery) with strict field validation without persisting sensitive card credentials.

5. **Order Lifecycle & Tracking**:
   - Real-time order creation with snapshot pricing and permanent order IDs (`AMZ-YYYYMMDD-XXXXXX`).
   - Interactive 5-stage tracking timeline (Placed $\to$ Processing $\to$ Shipped $\to$ Out for Delivery $\to$ Delivered).
   - Order history with package re-tracking and "Buy Again" single-click replenishment.

6. **Customer Personalization & Quick Actions**:
   - Accessible Quick View modal for previewing specifications without leaving search context.
   - Persistent Wishlist (`/wishlist`) with one-click "Move to Cart".
   - 10-item deduplicated "Recently Viewed" history on homepage and account dashboard.
   - Transparent, deterministic recommendations based on category affinity and high customer satisfaction ($\ge 4.5\star$).
   - Accessible animated Toast feedback system for all key shopping actions.

---

## Architecture Overview

```
src/
├── components/
│   ├── checkout/      # AddressForm, PaymentMethods, DeliveryOptions, OrderSummary
│   ├── common/        # Button, Card, Badge, Modal, Input, Toast, ErrorBoundary
│   ├── home/          # HeroBackgroundSlider, CategoryCards, DealsRow, Recommendations
│   ├── order/         # OrderTimeline, OrderCard
│   ├── pdp/           # ImageGallery, BuyBox, ProductInfo, ProductComparison
│   └── search/        # FilterSidebar, SearchAutocomplete, SortBar, ProductCard
├── context/
│   ├── CartContext.tsx    # Cart & Save-for-Later state with localStorage sync
│   └── ToastContext.tsx   # Global accessible notification live-region
├── data/
│   └── products.ts        # 36 high-quality products across 6 departments
├── hooks/
│   ├── useRecentlyViewed.ts  # 10-item buffer for recent browsing
│   └── useWishlist.ts        # Persistent customer wishlist hook
├── layouts/
│   ├── Header.tsx         # Amazon-styled top navigation, search, mobile drawer
│   ├── Footer.tsx         # Multi-column footer & Back-to-Top trigger
│   └── MainLayout.tsx     # Shell layout wrapper
├── pages/
│   ├── HomePage.tsx       # Storefront with hero, deals, categories & recent items
│   ├── SearchPage.tsx     # Discovery catalog with sidebar filters & grid/list views
│   ├── ProductDetailPage.tsx # Comprehensive PDP with zoom & comparison
│   ├── CartPage.tsx       # Active shopping cart & saved items
│   ├── CheckoutPage.tsx   # 3-step checkout funnel
│   ├── OrderConfirmationPage.tsx # Order confirmation with live tracking
│   ├── OrdersPage.tsx     # Order history with Buy Again
│   ├── WishlistPage.tsx   # Saved items & Move-to-Cart
│   ├── AccountPage.tsx    # Customer dashboard & address book
│   └── NotFoundPage.tsx   # Custom 404 with search & home recovery
├── types/                 # Comprehensive TypeScript definitions
└── utils/                 # Checkout calculations, storage, recommendations
```

---

## Installation & Local Development

### Prerequisites
- Node.js 20+ (Node 22 or 24 recommended)
- npm 10+

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/waqarbytes/amazon-rebuild.git
   cd amazon-rebuild
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Type check**:
   ```bash
   npx tsc --noEmit
   ```

5. **Run automated test suites**:
   ```bash
   npm test
   ```

6. **Build for production**:
   ```bash
   npm run build
   ```

7. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## Production Deployment

The project is built with standard Vite and supports deployment to any static hosting provider:

- **Vercel**: Includes `vercel.json` with SPA rewrite rules (`/(.*)` $\to$ `/`).
- **Netlify**: Includes `public/_redirects` with `/* /index.html 200`.
- **Cloudflare Pages / Tunnel**: Supports direct static delivery with allowed hosts enabled.

---

## Security & Privacy Note

- **No Real Payment Processing**: Payment forms simulate transaction validation without processing real money.
- **Credential Protection**: Credit card numbers and CVV codes are never written to `localStorage`.
- **Demo Experience**: The default user profile ("Alex Johnson") is explicitly an interactive demo state.
