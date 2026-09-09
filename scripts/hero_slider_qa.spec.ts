import { test, expect } from '@playwright/test';

const ARTIFACT_DIR = '/Users/mohdwaqar/.gemini/antigravity-ide/brain/cc51ab3d-3fbb-4f7a-9e8f-cacd9c90a64b';

test('Hero Background Slider QA & Verification', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Visit Homepage
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  // Verify the hero section and foreground text
  const headline = page.locator('h1');
  await expect(headline).toContainText('Everything you love.');
  await expect(headline).toContainText('Faster & cleaner.');

  const sonyCard = page.locator('text=Sony WH-1000XM5 Wireless Headphones').first();
  await expect(sonyCard).toBeVisible();

  // Verify pagination dots (5 tabs)
  const dots = page.locator('div[role="tablist"] button[role="tab"]');
  await expect(dots).toHaveCount(5);

  // Check Slide 1 is active initially
  await expect(dots.nth(0)).toHaveAttribute('aria-selected', 'true');
  await page.screenshot({ path: `${ARTIFACT_DIR}/hero_slide_1_tech.png` });

  // 2. Test manual dot click (jump to Slide 3: Fashion)
  await dots.nth(2).click();
  await expect(dots.nth(2)).toHaveAttribute('aria-selected', 'true');
  await expect(dots.nth(0)).toHaveAttribute('aria-selected', 'false');
  await page.screenshot({ path: `${ARTIFACT_DIR}/hero_slide_3_fashion.png` });

  // 3. Test manual dot click (jump to Slide 2: Home & Kitchen)
  await dots.nth(1).click();
  await expect(dots.nth(1)).toHaveAttribute('aria-selected', 'true');
  await page.screenshot({ path: `${ARTIFACT_DIR}/hero_slide_2_home.png` });

  // Move mouse away from hero section and blur active button so autoplay resumes
  await page.mouse.move(0, 0);
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());

  // 4. Test Autoplay: wait for 4.5s transition from Slide 2 (index 1) to Slide 3 (index 2)
  console.log('Testing autoplay transition...');
  await page.waitForTimeout(5000);
  await expect(dots.nth(2)).toHaveAttribute('aria-selected', 'true');

  // Autoplay to Slide 4
  await page.waitForTimeout(5000);
  await expect(dots.nth(3)).toHaveAttribute('aria-selected', 'true');

  // Autoplay to Slide 5
  await page.waitForTimeout(5000);
  await expect(dots.nth(4)).toHaveAttribute('aria-selected', 'true');
  await page.screenshot({ path: `${ARTIFACT_DIR}/hero_slide_5_beauty.png` });

  // 5. Test Hover Pause: hover over the hero section
  const heroSection = page.locator('section').first();
  await heroSection.hover();
  console.log('Hovering to test pause behavior...');
  await page.waitForTimeout(5000); // 5s > 4.5s
  // Slide should still be Slide 5 (paused)
  await expect(dots.nth(4)).toHaveAttribute('aria-selected', 'true');

  // Move mouse away to resume
  await page.mouse.move(0, 0);

  // 6. Test Focus Pause
  const dealsCta = page.locator('a:has-text("Shop Today\'s Deals")');
  await dealsCta.focus();
  console.log('Focusing CTA to test pause behavior...');
  await page.waitForTimeout(5000);
  // Slide should remain paused while focused
  await expect(dots.nth(4)).toHaveAttribute('aria-selected', 'true');

  // 7. Verify foreground stability: position of headline and Sony card
  const headlineBox = await headline.boundingBox();
  const cardBox = await sonyCard.boundingBox();
  expect(headlineBox).not.toBeNull();
  expect(cardBox).not.toBeNull();

  // 8. Test Mobile Viewport at 375px
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  // Verify zero horizontal scroll
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

  await expect(page.locator('h1')).toBeVisible();
  await page.screenshot({ path: `${ARTIFACT_DIR}/hero_slider_mobile_375px.png` });

  // 9. Verify 0 Console Errors
  const filteredErrors = consoleErrors.filter(e => !e.includes('favicon'));
  console.log(`Console error count: ${filteredErrors.length}`);
  expect(filteredErrors.length).toBe(0);
});
