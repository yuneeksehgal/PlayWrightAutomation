//Import test package for all tests
const {test,expect}= require('@playwright/test');


//We can replace function() with ()=> since function has no name 
test('Screenshot & Visual comparision', async ({browser})=>

{
   //chrome - plugins/ cookies
   const context = await browser.newContext();
   const page= await context.newPage();
   await page.goto("https://www.breadcrumbs.app/");
   await expect(page).toHaveTitle('Blockchain Analytics: Crypto Tracker | Breadcrumbs Crypto');
   await page.locator("a[data-testid='navbar-Log in']").click();
   
   // Full page screenshot 
   await page.screenshot({path: 'screenshots/screenshot.png'});

   await page.locator("#email").fill("yuneek@breadcrumbs.app");
   await page.locator("#password").fill("Testing1@3");
   //await page.waitForTimeout(2000);
   await page.waitForLoadState();
   await page.locator('#btn-login').click();
   console.log(await page.locator('div[data-testid="navbar-right-section"] p').textContent());
   await expect(page.locator('div[data-testid="navbar-right-section"] p')).toContainText('YuneekSehgal');

   
   await page.getByText("New Report").click();

  // Locator level screenshot 
  await page.locator('#dialog').screenshot({path:'screenshots/partialScreenshot.png'});


});

//screenshot -store -> screenshot -> 

test.only('Visual Comparison',async({page})=>
{
    //make payment -when you 0 balance
      await page.goto("https://www.breadcrumbs.app/pricing");
      await page.waitForLoadState();
      expect(await page.screenshot()).toMatchSnapshot('pricing.png');

})