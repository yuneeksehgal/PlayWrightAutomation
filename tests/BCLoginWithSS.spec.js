//Import test package for all tests
// Web API with session storage

const {test,expect}= require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=>

{

   const context = await browser.newContext();
   const page= await context.newPage();

   await page.goto("https://www.breadcrumbs.app/");
   await expect(page).toHaveTitle('Blockchain Analytics: Crypto Tracker | Breadcrumbs Crypto');
   await page.locator("a[data-testid='navbar-Log in']").click();
   await page.locator("#email").fill("yuneek@breadcrumbs.app");
   await page.locator("#password").fill("Testing1@3");
   //await page.waitForTimeout(2000);
   await page.waitForLoadState();
   await page.locator('#btn-login').click();
   console.log(await page.locator('div[data-testid="navbar-right-section"] p').textContent());

   await context.storageState({path: 'state.json'});
   webContext = await browser.newContext({storageState:'state.json'});

})

//We can replace function() with ()=> since function has no name 
test('Login flow with Session Storage', async ()=>

{
   //chrome - plugins/ cookies
   //const context = await browser.newContext();
   const page= await webContext.newPage();
   
   await page.goto("https://www.breadcrumbs.app/");  

   await expect(page.locator('div[data-testid="navbar-right-section"] p')).toContainText('YuneekSehgal');
   
}
);

