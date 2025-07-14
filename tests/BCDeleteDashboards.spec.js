//Import test package for all tests
// Web API with session storage

const {test,expect}= require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=>

{

   const context = await browser.newContext();
   const page= await context.newPage();

   await page.goto("https://monitor.breadcrumbs.app/dashboards");
   //await page.goto("https://staging-monitor-1.breadcrumbs.app/");
   await expect(page).toHaveTitle(/Breadcrumbs/);
   await page.locator("a[data-testid='navbar-Log in']").click();
   await page.locator("#email").fill("yuneek@breadcrumbs.app");
  // await page.locator("#email").fill("yuneek+22a@breadcrumbs.app");
   await page.locator("#password").fill("Testing1@3");
   //await page.waitForTimeout(2000);
   await page.waitForLoadState();
   await page.locator('#btn-login').click();
   console.log(await page.locator('div[data-testid="navbar-right-section"] p').textContent());

   await context.storageState({path: 'state.json'});
   webContext = await browser.newContext({storageState:'state.json'});

})

//We can replace function() with ()=> since function has no name 
test('Delete Dashboard from Monitoring Tool Account', async ()=>

{
   //chrome - plugins/ cookies
   //const context = await browser.newContext();
   const page= await webContext.newPage();
   
   await page.goto("https://monitor.breadcrumbs.app/dashboards");
   //await page.goto("https://staging-monitor-1.breadcrumbs.app/");  

   //await expect(page.locator('div[data-testid="navbar-right-section"] p')).toContainText('YuneekAdmin');
   await expect(page.locator('div[data-testid="navbar-right-section"] p')).toContainText('YuneekSehgal');
   //await expect(page.locator('div[data-testid="navbar-right-section"] p')).toContainText('Yuneek22aLEPaid');
   await page.locator('span[data-testid="tab-link-item-1"]').click();

   

  await page.waitForLoadState('networkidle');
  await page.waitForSelector('ul[data-testid="dashboard-list-private"]');


  const totalDashboards = await page.evaluate(() => {
  const list = document.querySelector('ul[data-testid="dashboard-list-private"]');
  return list ? list.childElementCount : 0;
});

console.log(`Total private dashboards: ${totalDashboards}`);


let index = 1;
const matches = [];


while (true) {
  const titleSelector = `ul[data-testid="dashboard-list-private"] > a:nth-of-type(${index}) > div:nth-child(2) > div:nth-child(1)`;
  const titleElement = await page.locator(titleSelector);

  // Exit loop if no matching element exists
  if (!(await titleElement.count())) break;

  const title = await titleElement.textContent();

  if (title && title.includes('Test')) {
    console.log(`Matched: ${title}`);
    matches.push(title); // Store the selector or title for later  
    
    //break;
  }

  index++;
}

// 🎯 Take action on collected matches (e.g., click them one by one)
for (let i = matches.length; i > 0 ; i--) {
  
    //const titleElement = await page.locator(matches[i-1]);
    //const title = await titleElement.textContent();
    await page.getByText(matches[i-1]).click();
    await expect(page.getByText('Dashboard Settings')).toBeVisible();
    await page.getByText('Dashboard Settings').click();
    await page.locator('button[color="danger"]').click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    console.log(`Deleted: ${matches[i-1]}`);
    await expect(page.locator('div[data-testid="notification"]')).toContainText('Dashboard deleted');
    await page.waitForSelector('ul[data-testid="dashboard-list-private"] > a:nth-of-type(1) > div:nth-child(2) > div:nth-child(1)');
    await page.waitForLoadState();
    await page.waitForTimeout(500);
    continue;
}

   
}
);

