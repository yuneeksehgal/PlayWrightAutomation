import { test, expect, Browser, Locator,Page } from '@playwright/test';

test('Browser Context Playwright Test', async ({ browser }: { browser: Browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.breadcrumbs.app/");
  await expect(page).toHaveTitle(/Breadcrumbs/);

  await page.locator("a[data-testid='navbar-Log in']").click();
  await page.locator("#email").fill("yuneek@breadcrumbs.app");
  await page.locator("#password").fill("Testing1@3");

  await page.waitForLoadState();
  await page.locator('#btn-login').click();

  
  const usernameText = await page.locator('div[data-testid="navbar-right-section"] p').textContent();
  console.log(usernameText);

  await expect(page.locator('div[data-testid="navbar-right-section"] p')).toContainText('YuneekSehgal');
})

test('Page Playwright Test', async ({ page }: { page: Page }) => {

      const email = "yuneeksehgal@gmail.com";
      const productName = 'ADIDAS ORIGINAL';
      const products = page.locator(".card-body");

       await page.goto("https://rahulshettyacademy.com/client");
       await page.locator("#userEmail").fill(email);
       await page.locator("#userPassword").fill("Testing1@3");
       await page.locator("[value='Login']").click();

       await page.waitForLoadState('networkidle');
       await page.locator(".card-body b").first().waitFor();
       
       const titles = await page.locator(".card-body b").allTextContents();
       console.log(titles); 

});