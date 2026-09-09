import { test, expect } from '@playwright/test';

test.describe('Live Public Production Deployment QA', () => {
  test('Public URL loads, hero slider works, and search functions seamlessly', async ({ page }) => {
    const publicUrl = 'https://duke-coleman-annie-owner.trycloudflare.com';
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Load Homepage
    await page.goto(publicUrl);
    await expect(page.locator('h1')).toContainText('Everything you love.');

    // 2. Verify Hero Slider (5 pagination tabs)
    const dots = page.locator('div[role="tablist"] button[role="tab"]');
    await expect(dots).toHaveCount(5);

    // 3. Verify Search Navigation
    const searchInput = page.locator('input[placeholder*="Search Amazon"]');
    await searchInput.fill('Apple');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/.*search.*q=Apple.*/);
    const productCard = page.locator('[data-testid="product-card"]').first();
    await expect(productCard).toBeVisible();

    // 4. Verify Product Detail
    await productCard.locator('a[href*="/product/"]').first().click();
    await expect(page).toHaveURL(/.*product.*/);
    await expect(page.locator('h1')).toBeVisible();

    // 5. Verify Add to Cart
    await page.getByRole('button', { name: /add to cart/i }).first().click();
    await page.waitForTimeout(500);

    // 6. Verify Cart
    await page.goto(`${publicUrl}/cart`);
    await expect(page.locator('h1')).toContainText('Shopping Cart');

    // 7. Verify Core Direct Routes on Public URL
    const directRoutes = ['/wishlist', '/orders', '/account'];
    for (const route of directRoutes) {
      await page.goto(`${publicUrl}${route}`);
      await expect(page.locator('body')).toBeVisible();
    }

    expect(consoleErrors).toHaveLength(0);
  });
});
