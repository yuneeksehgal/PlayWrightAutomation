//Import test package for all tests
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

// Import the test data
const testData = require("../utils/BCTestData.json");

const env = process.env.ENV || 'production'; // default to production
const envUrl = env === 'staging' ? testData.stagingURL : testData.productionURL;
const envReport = env === 'staging' ? testData.stagingReport : testData.productionReport;

test.describe.configure({ mode: 'serial' });

let page;
let poManager;

// ✅ Global setup
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  poManager = new POManager(page);

});

// ✅ Clean up
test.afterAll(async () => {
  await page.close();
});

//We can replace function() with ()=> since function has no name 
test('Login Page with Page Objects', async ({ }) => {

  // Get the LoginPage object from POManager
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo(envUrl);
  await loginPage.validLogin(testData.useremail, testData.password, testData.username);

}
);



test('Investigation Tool | Transaction Slider Export to CSV', async ({ }) => {
  const homePage = poManager.getHomePage();
  const reportsPage = poManager.getReportsPage();

  // Navigate to the home page and create a new report 
  await homePage.newReport();

  const sheetPath = 'downloadedExport.csv';

  await reportsPage.pressOK();
  await reportsPage.setInputHash(testData.ethHashValue);
  await reportsPage.addAllTxsToGraph();
  await reportsPage.txSliderExport(); 

  }
);

test('Smart Expand | Check if user are able to Export to CSV from transactions tab', async ()=>

{
  const homePage = poManager.getHomePage();
  const reportsPage = poManager.getReportsPage();
  
  await homePage.newReport();
  await reportsPage.pressOK();
  await reportsPage.setInputAddress(testData.inputETHAddress);
  await reportsPage.smartExpandExport();

});

test('Investigation Tool V2 | Download PDF', async ()=>

{
   const homePage = poManager.getHomePage();
   const reportsPage = poManager.getReportsPage();

   await homePage.openSavedReport(envReport);

   await reportsPage.pressOK();
   await reportsPage.investigationDownloadPDF();

}
);

test('Investigation Tool V2 | Download CSV', async ()=>

{
   const homePage = poManager.getHomePage();
   const reportsPage = poManager.getReportsPage();
   await page.reload();
   await reportsPage.pressOK();
   await reportsPage.investigationDownloadCSV();

}
);

test('Investigation Tool V2 | Download Timeline Video', async ()=>

{
   const homePage = poManager.getHomePage();
   const reportsPage = poManager.getReportsPage();
   await page.reload();
   await reportsPage.pressOK();
   await reportsPage.investigationDownloadTimelineVideo();

}
);
