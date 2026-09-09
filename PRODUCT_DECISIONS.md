# Product Decisions & UX Architecture

This document details the intentional design decisions and UX improvements implemented in the Amazon Rebuild project, highlighting how they resolve common frictions found on the traditional Amazon storefront.

---

### 1. Why the Homepage is Cleaner than Amazon
Traditional Amazon suffers from extreme visual density: competing ad banners, overlapping sponsored widgets, dense multi-layered carousels, and inconsistent card typography. Our rebuild replaces this clutter with a structured visual hierarchy:
- High-contrast typography with clear semantic spacing.
- Focused category exploration cards with high-quality photography.
- Clear separation between curated deals, top-rated products, and recent items.
- Absence of intrusive third-party ads and misleading badges.

### 2. Why Search is Intent-Driven
Amazon search results often interleave organic results with sponsored placements, distracting customers from their initial intent. Our search experience provides:
- Multi-category instant autocomplete grouping relevant Categories, Brands, and Products as the user types.
- Full keyboard accessibility (Arrow Up/Down, Enter, Escape).
- Instant, client-side filtering by Department, Offers (Deals/Prime), Brands, Customer Ratings, and Price Range with zero layout shift.
- Visible active filter chips with one-click dismiss and single-click "Clear All".

### 3. Why Quick View Exists
Standard e-commerce forces customers to open multiple browser tabs or leave their search context just to check basic details (dimensions, package contents, delivery time).
- Quick View opens an accessible modal with focus trapping and keyboard navigation directly from any product card.
- Shoppers can inspect image galleries, pricing, review distribution, prime badges, and add directly to cart with a custom quantity without losing their scroll position.

### 4. Why Comparison Exists
Customers frequently get stuck comparing specifications across multiple tabs when evaluating similar tech or household items.
- The Product Comparison matrix on the Product Detail Page places 3 closely matched category alternatives side-by-side.
- Compares price, ratings, review volume, delivery speed, stock status, and feature highlights in a clean responsive grid.
- Includes quick "Add to Cart" triggers for direct action.

### 5. Why Recently Viewed Exists
Shoppers rarely purchase on first impulse; they explore, compare, and return.
- A client-side, 10-item deduplicated buffer is updated immediately upon viewing any product detail page.
- Accessible on both the homepage and the Account Dashboard.
- Enables single-click re-navigation to products evaluated during the active shopping journey.

### 6. Why Wishlist Exists
Immediate purchase is not always the goal—shoppers collect items for upcoming events, budget cycles, or gift ideas.
- Dedicated `/wishlist` route with persistent storage in `localStorage`.
- Heart icon toggle on all product cards with instant toast feedback.
- One-click "Move to Cart" workflow which seamlessly transfers saved items into the active checkout funnel.

### 7. Why Recommendations are Deterministic
Opaque "AI" recommendation widgets often promote high-margin or sponsored products irrelevant to the shopper's true intent.
- Our deterministic recommendation engine evaluates explicit user engagement:
  1. Primary category affinity derived from recent browsing history.
  2. High customer satisfaction ($\ge 4.5\star$ rating threshold).
  3. Review confidence ($\ge 1,000$ verified reviews).
  4. Best Seller and Deal flags.
- Shoppers receive genuinely relevant, high-quality suggestions that transparently explain *why* an item is recommended.

### 8. Why Checkout Was Simplified
Traditional Amazon checkout is spread across multi-page redirects with repeated prompts for Prime upsells and credit card promotions.
- Our checkout features a single unified 3-step workflow:
  1. Shipping Address (saved address book with Add/Edit/Default capabilities).
  2. Delivery Speed (FREE Prime, FREE Standard, or Priority Express with dynamic price calculation).
  3. Payment Method (Card, UPI, Cash on Delivery with strict field validation without storing sensitive card details).
- Real-time order summary with dynamic tax calculation ($9\%$), free shipping over $25$ or Prime, and immediate order creation.

### 9. Why the Hero Uses a Background Image Slider
Static ecommerce banners either overwhelm the foreground text or fail to convey the breadth of the catalog.
- The Hero background slider smoothly crossfades through 5 distinct lifestyle images (Electronics, Home, Fashion, Books, Beauty).
- Employs a balanced two-sided horizontal gradient: darker navy on the left ($65\%\to35\%$) ensures crisp headline readability, while transparent right ($20\%$) allows full visibility of the lifestyle photography and Sony deal spotlight.
- 4.5-second autoplay with automatic hover and focus pause, plus `prefers-reduced-motion` compliance.

### 10. How the Design Tries to Reduce Shopping Friction
Every interaction in this rebuild was crafted to eliminate unnecessary clicks and confusion:
- **Zero Layout Shifts**: Image aspect ratios are explicitly defined with skeleton/fallback loaders.
- **Cart Toast Confirmation**: Instant animated feedback upon cart addition with item count, thumbnail, and quick "View Cart" CTA.
- **Save for Later**: Active cart items can be moved to a secondary list without losing quantity or pricing context.
- **Full Order Lifecycle**: Immediate transition from checkout to interactive timeline tracking (Confirmed $\to$ Processing $\to$ Shipped $\to$ Out for Delivery $\to$ Delivered) and full order history with "Buy It Again" replenishment.
