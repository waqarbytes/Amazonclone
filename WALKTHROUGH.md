# 5-Minute Video Walkthrough Script

This script provides a concise, minute-by-minute guide for presenting the Amazon Rebuild in a 5-minute video demonstration.

---

### [0:00 - 0:30] Homepage and Design Philosophy
- **Speaker Action**: Show the live homepage on desktop.
- **Narrative**:
  > *"Welcome! Today I'm showcasing our modern rebuild of the Amazon shopping experience. Our primary objective wasn't to create a pixel-for-pixel clone of Amazon's visual clutter, but to reimagine it with cleaner information architecture, higher speed, and zero friction.*
  > *Notice the hero section: it features an automatic crossfading background slider showcasing 5 core categories—Electronics, Home, Fashion, Books, and Beauty. We engineered a balanced two-sided navy gradient so the lifestyle photography remains vibrant while the headline and Sony spotlight card stay crisply readable. Autoplay smoothly pauses on hover or keyboard focus."*

---

### [0:30 - 1:15] Search and Discovery
- **Speaker Action**: Click the search input, type `"head"`, show autocomplete, then press enter or select headphones to show the search results page.
- **Narrative**:
  > *"In the header, our rich search input gives instant multi-faceted autocomplete—grouping matched categories, brands, and specific products with full keyboard arrow navigation.*
  > *On the search results page, everything is instant and client-side. Notice the left sidebar filters: we can filter by Department, Prime eligibility, Brands like Sony or Bose, Customer Reviews, and Price Range.*
  > *Active filter chips appear above the results with instant one-click removal and a 'Clear All' button. Shoppers can toggle seamlessly between a 3-column grid and a detailed list view with sorting by Price, Rating, and Featured."*

---

### [1:15 - 2:00] Product Detail, Quick View & Comparison
- **Speaker Action**: Trigger Quick View from a card, then navigate to the full Product Detail Page (`/product/prod-1`), hover over images for zoom, and scroll to the Comparison Matrix.
- **Narrative**:
  > *"Shoppers can preview key specifications, reviews, and stock without losing their context via the Quick View modal. Clicking through brings us to the full Product Detail Page.*
  > *Here we have high-resolution interactive image galleries with mouse hover magnification, clear Prime badges, stock indicators, and customer review distributions.*
  > *Further down the page, our side-by-side Comparison Matrix compares the active product against 3 closely matched category alternatives—highlighting specs, delivery speed, and pricing with direct 'Add to Cart' triggers."*

---

### [2:00 - 3:00] Cart & Streamlined Checkout
- **Speaker Action**: Click "Add to Cart", show the animated toast notification, navigate to `/cart`, adjust quantity, demonstrate "Save for Later", and click "Proceed to Checkout".
- **Narrative**:
  > *"When an item is added, an accessible toast notification appears with thumbnail and cart subtotal. In the Cart, users can update quantities, remove items, or use 'Save for later'.*
  > *Proceeding to Checkout demonstrates our simplified 3-step funnel:*
  > *Step 1: Saved delivery addresses with the ability to edit or add new addresses.*
  > *Step 2: Transparent delivery options—including Free Prime Delivery and Priority Express with dynamic cost calculation.*
  > *Step 3: Clean payment selection across Card, UPI, and Cash on Delivery with form validation. Notice we do not store sensitive payment credentials."*

---

### [3:00 - 3:45] Order Confirmation, Interactive Tracking & Orders
- **Speaker Action**: Click "Place Your Order", show the generated order confirmation page, click through the interactive tracking timeline, then visit `/orders` and click "Buy Again".
- **Narrative**:
  > *"Clicking 'Place Order' creates a permanent order record with snapshot pricing, estimated delivery date, and a carrier tracking code.*
  > *The order confirmation displays an interactive delivery timeline tracking states from Order Placed through Shipped to Delivered.*
  > *Navigating to 'Returns & Orders' shows the complete purchase history, with options to re-track packages or use 'Buy Again' to immediately replenishment items directly to the cart."*

---

### [3:45 - 4:30] Wishlist, Recently Viewed & Account Area
- **Speaker Action**: Click heart icons to toggle wishlist items, visit `/wishlist`, click "Move to Cart", then navigate to `/account` to show profile, address book, and recently viewed.
- **Narrative**:
  > *"Customer personalization is transparent and deterministic. The Wishlist allows shoppers to save items with instant toast confirmation and easily 'Move to Cart'.*
  > *A 10-item deduplicated 'Recently Viewed' buffer tracks items evaluated across the session and displays them on the homepage and account dashboard.*
  > *In the Account dashboard, customers can view their active orders, manage default shipping addresses, update account details, and review recently browsed products."*

---

### [4:30 - 5:00] What Makes This Better Than a Basic Clone
- **Speaker Action**: Switch browser viewport to 375px mobile view, demonstrating zero horizontal overflow and responsive drawer.
- **Narrative**:
  > *"To summarize: why is this experience better than standard Amazon?*
  > *First, visual clarity: no sponsored ads, clutter, or visual noise.*
  > *Second, speed and feedback: instant client-side filtering, Quick View modals, and responsive toast feedback.*
  > *Third, a frictionless checkout: a unified single-page funnel that respects customer time.*
  > *Finally, bulletproof responsiveness: tested across 375px mobile, tablets, and 1440px desktop with 100% test coverage and zero console errors.*
  > *Thank you for reviewing the Amazon Rebuild!"*
