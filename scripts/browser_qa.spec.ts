import { test, expect } from '@playwright/test';

const ARTIFACT_DIR = '/Users/mohdwaqar/.gemini/antigravity-ide/brain/cc51ab3d-3fbb-4f7a-9e8f-cacd9c90a64b';

test('Milestone 6 Full Browser Flow & QA', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Visit Homepage
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('h1')).toContainText('Faster & cleaner');
  
  // Verify sections
  await expect(page.locator('text=Deals worth seeing').first()).toBeVisible();
  await expect(page.locator('text=Popular right now').first()).toBeVisible();
  await expect(page.locator('text=Top rated in your categories').first()).toBeVisible();

  // Capture Homepage screenshot
  await page.screenshot({ path: `${ARTIFACT_DIR}/m6_homepage_personalization.png`, fullPage: false });

  // 2. Test Quick View Modal
  const firstCard = page.locator('[data-testid="product-card"]').first();
  await firstCard.hover();
  const quickViewBtn = firstCard.locator('button:has-text("Quick View")');
  await quickViewBtn.click();

  // Verify modal is open
  const modal = page.locator('[role="dialog"]');
  await expect(modal).toBeVisible();
  await expect(modal.locator('#quickview-title')).toBeVisible();
  await expect(modal.locator('button:has-text("Add to Cart")')).toBeVisible();
  await page.screenshot({ path: `${ARTIFACT_DIR}/m6_quick_view_modal.png` });

  // Close Quick View with Escape
  await page.keyboard.press('Escape');
  await expect(modal).not.toBeVisible();

  // 3. Visit PDP to populate recently viewed
  await page.goto('http://localhost:3000/product/prod-elec-1');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('h1')).toContainText('Sony WH-1000XM5');

  // Verify Comparison Table
  const compSection = page.locator('text=Side-by-Side Comparison');
  await expect(compSection).toBeVisible();
  await compSection.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${ARTIFACT_DIR}/m6_pdp_comparison.png` });

  // Add to Wishlist on PDP to test toast
  const wishlistBtn = page.locator('button:has-text("Add to Wishlist")');
  if (await wishlistBtn.isVisible()) {
    await wishlistBtn.click();
    await expect(page.locator('[role="alert"]').first()).toBeVisible();
  }

  // 4. Return to Homepage to verify "Recently viewed" & "Because you viewed..."
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Recently viewed').first()).toBeVisible();
  await expect(page.locator('text=Because you viewed').first()).toBeVisible();
  await page.screenshot({ path: `${ARTIFACT_DIR}/m6_homepage_recently_viewed.png` });

  // 5. Visit Wishlist Page
  await page.goto('http://localhost:3000/wishlist');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('h1')).toHaveText(/Your list is waiting|Your Wishlist/);
  await page.screenshot({ path: `${ARTIFACT_DIR}/m6_wishlist_page.png` });

  // 6. Visit Account Dashboard
  await page.goto('http://localhost:3000/account');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Alex Johnson').first()).toBeVisible();
  await expect(page.locator('text=alex@example.com').first()).toBeVisible();
  await page.screenshot({ path: `${ARTIFACT_DIR}/m6_account_dashboard.png` });

  // 7. Test Mobile Viewport (375x667)
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  
  // Check horizontal overflow
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // Zero overflow
  await page.screenshot({ path: `${ARTIFACT_DIR}/m6_mobile_375px.png` });

  // Verify zero application console errors
  const appErrors = consoleErrors.filter(err => !err.includes('favicon'));
  console.log(`Application console errors: ${appErrors.length}`);
  expect(appErrors.length).toBe(0);
});
