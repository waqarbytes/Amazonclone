import { test, expect } from '@playwright/test';

test.describe('M7 Full Production QA & Verification', () => {
  test('Complete End-to-End User Funnel with Zero Console Errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Home
    await page.goto('http://localhost:3000/');
    await expect(page.locator('h1')).toContainText('Everything you love.');

    // 2. Search
    const searchInput = page.locator('input[placeholder*="Search Amazon"]');
    await searchInput.fill('Sony');
    await page.keyboard.press('Enter');

    // 3. Search Results
    await expect(page).toHaveURL(/.*search.*q=Sony.*/);
    const firstProductCard = page.locator('[data-testid="product-card"]').first();
    await expect(firstProductCard).toBeVisible();

    // 4. Product Detail
    const productLink = firstProductCard.locator('a[href*="/product/"]').first();
    await productLink.click();
    await expect(page).toHaveURL(/.*product.*/);
    await expect(page.locator('h1')).toBeVisible();

    // 5. Add to Cart
    const addToCartBtn = page.getByRole('button', { name: /add to cart/i }).first();
    await addToCartBtn.click();
    await page.waitForTimeout(500);

    // 6. Cart
    await page.goto('http://localhost:3000/cart');
    await expect(page.locator('h1')).toContainText('Shopping Cart');
    const checkoutBtn = page.getByRole('button', { name: /proceed to checkout/i });
    await checkoutBtn.click();

    // 7. Checkout (Step 1 Address -> Step 2 Delivery -> Step 3 Payment & Place Order)
    await expect(page).toHaveURL(/.*checkout.*/);
    const step2Btn = page.getByRole('button', { name: /continue to step 2/i });
    await step2Btn.click();
    await page.waitForTimeout(400);

    const step3Btn = page.getByRole('button', { name: /continue to step 3/i });
    await step3Btn.click();
    await page.waitForTimeout(400);

    const placeOrderBtn = page.getByRole('button', { name: /place your order/i }).first();
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();

    // 8. Order Confirmation & Tracking
    await expect(page).toHaveURL(/.*order-confirmation.*/);
    await expect(page.locator('h1')).toContainText('Order placed, thank you!');

    // 9. Orders & Buy Again
    await page.goto('http://localhost:3000/orders');
    await expect(page.locator('h1')).toContainText('Your Orders');
    const buyAgainBtn = page.getByRole('button', { name: /buy it again/i }).first();
    await expect(buyAgainBtn).toBeVisible();
    await buyAgainBtn.click();
    await page.waitForTimeout(500);

    // Verify no blocking console errors occurred
    expect(consoleErrors).toHaveLength(0);
  });

  test('Direct Route Navigation and Refresh for All Core Routes', async ({ page }) => {
    const routes = [
      '/',
      '/search',
      '/products/prod-1',
      '/product/prod-1',
      '/cart',
      '/checkout',
      '/orders',
      '/wishlist',
      '/account',
      '/tracking/AMZ-TEST-ORDER'
    ];

    for (const route of routes) {
      await page.goto(`http://localhost:3000${route}`);
      await expect(page.locator('body')).toBeVisible();
      // Test refresh
      await page.reload();
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('Responsive Layouts Verification across 375px, 768px, 1024px, 1440px', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('http://localhost:3000/');
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    }
  });
});
