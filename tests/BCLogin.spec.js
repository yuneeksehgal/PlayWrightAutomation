//Import test package for all tests
const {test,expect}= require('@playwright/test');


//We can replace function() with ()=> since function has no name 
test('Browser Context Playwright Test', async ({browser})=>

{
   //chrome - plugins/ cookies
   const context = await browser.newContext();
   const page= await context.newPage();
   await page.goto("https://www.breadcrumbs.app/");
   await expect(page).toHaveTitle('Blockchain Analytics: Crypto Tracker | Breadcrumbs Crypto');
   await page.locator("a[data-testid='navbar-Log in']").click();
   await page.locator("#email").fill("jamezz24@yahoo.com");
   await page.locator("#password").fill("BQu69ZE67HYxM8C");
   //await page.waitForTimeout(2000);
   await page.waitForLoadState();
   await page.locator('#btn-login').click();
   console.log(await page.locator('div[data-testid="navbar-right-section"] p').textContent());
   await expect(page.locator('div[data-testid="navbar-right-section"] p')).toContainText('jamezz24');
}
);

