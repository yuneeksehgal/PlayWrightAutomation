// breadcrumbs-pathfinder.spec.js
const { test, expect } = require('@playwright/test');

test('Path Finder V2 flow on Breadcrumbs staging', async ({ page }) => {
  await page.goto('https://staging-investigate-1.breadcrumbs.app/');

  // Login sequence
  await page.click('a[data-testid="navbar-Log in"]');
  await page.fill('#email', 'yuneek@breadcrumbs.app');
  await page.fill('#password', 'Testing1@3');
  await page.waitForLoadState();
  await page.click('#btn-login');
  await expect(page.locator('div[data-testid="navbar-right-section"]')).toContainText('YuneekAdmin');

  // New report navigation
  await page.click('text=New Report');
  await page.locator("#dialog-footer button").click();
  await page.click('[data-testid="crypto-icons"]');
  await page.click('img[alt="BTC"]');

  // Bitcoin address input
  await page.click('div[data-testid="cursor-tooltip"]'); // Assuming this selects the second point
  const btcAddress = 'e7544d129e4aeac88d992e0836b44f9d20f6eb314ccd9d92605c79f51801423d';
  await page.fill('input[placeholder*="Bitcoin address"]', btcAddress);
  await page.keyboard.press('Enter');

  // Wait for UI updates
  await page.waitForTimeout(3000);

  // Select inputs & outputs
  await page.check('div[data-testid="tx-hash-input-table"] .checkbox-wrapper > input[type="checkbox"]');
  await page.check('div[data-testid="tx-hash-output-table"] .checkbox-wrapper > input[type="checkbox"]');
  await page.locator('#dialog-footer button[color="primary"]').click();

  // Close expanded timeline
  await page.click('div[data-testid="timeline-expanded"] svg[data-icon="xmark"]');

  // Launch Pathfinder
  await page.click('[data-testid="tooltip-container"] > .fa-compass');
  await page.click('div[data-testid="pathfinder-form-component"] .fa-plus');
  await page.click('text=OK');

  
  // Verify graph edge added
  await expect(page.locator('path[data-testid="edge-20AC0834E5B01FE664F6F575EE86CCA5"]')).toBeVisible();

  // Select a Transaction
  await page.locator('#edge-group-20AC0834E5B01FE664F6F575EE86CCA5 > circle').click();

  // Find paths
  await page.click('text=Find Paths');
  await expect(page.locator('.chVKMm > p')).toContainText('Hang tight! We’re searching for results…');
  await expect(page.locator('div[data-testid="pathfinder-results-table"] tbody')).toBeVisible();

   // Wait for UI updates
  await page.waitForTimeout(100000);

  // Select multiple rows by checkbox
  for (let i = 1; i <= 10; i++) {
    await page.check(`tr:nth-of-type(${i}) input[type="checkbox"]`);
  }

  // Close dialog
  await page.click('[data-testid="dialog-close-button"]');

  // Verify final graph edges
  await expect(page.locator('path[data-testid="edge-B9298116A3B0F12A8D90DFEDC4D62BD4"]')).toBeVisible();
  await expect(page.locator('path[data-testid="edge-97E262CFC93A06BE9FB642C91810C8D2"]')).toBeVisible();
});