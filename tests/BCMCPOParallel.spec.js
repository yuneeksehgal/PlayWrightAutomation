//Import test package for all tests
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

// Import the test data
const testData = require("../utils/BCTestData.json");

const env = process.env.ENV || 'production'; // default to production
const envUrl = env === 'staging' ? testData.stagingURL : testData.productionURL;
const envReport = env === 'staging' ? testData.stagingReport : testData.productionReport;
const storageStatePath = env === 'staging' ? 'state.staging.json' : 'state.production.json';

test.describe.configure({ mode: 'parallel' });


test('Investigation Tool | Transaction Slider Export to CSV', async ({ browser }) => {
 
  const context = await browser.newContext({ storageState: storageStatePath });
  const page= await context.newPage();
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const reportsPage = poManager.getReportsPage();

  await page.goto(envUrl);

  // Navigate to the home page and create a new report 
  await homePage.newReport();

  const sheetPath = 'downloadedExport.csv';

  await reportsPage.pressOK();
  await reportsPage.setInputHash(testData.ethHashValue);
  await reportsPage.addAllTxsToGraph();
  await reportsPage.txSliderExport(); 

  

  }
);

test('Smart Expand | Check if user are able to Export to CSV from transactions tab', async ({ browser })=>

{
  
  const context = await browser.newContext({ storageState: storageStatePath });
  const page= await context.newPage();
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const reportsPage = poManager.getReportsPage();

   await page.goto(envUrl);

  await homePage.newReport();
  await reportsPage.pressOK();
  await reportsPage.setInputAddress(testData.inputETHAddress);
  await reportsPage.smartExpandExport();
  

});

test('Investigation Tool V2 | Download PDF', async ({ browser })=>

{
   const context = await browser.newContext({ storageState: storageStatePath });
  const page= await context.newPage();
   const poManager = new POManager(page);
   
   const homePage = poManager.getHomePage();
   const reportsPage = poManager.getReportsPage();

   await page.goto(envUrl);

   await homePage.openSavedReport(envReport);

   await reportsPage.pressOK();
   await reportsPage.investigationDownloadPDF();
   

}
);

test('Investigation Tool V2 | Download CSV', async ({ browser })=>

{
   const context = await browser.newContext({ storageState: storageStatePath });
  const page= await context.newPage();
   const poManager = new POManager(page);
  
   const homePage = poManager.getHomePage();
   const reportsPage = poManager.getReportsPage();

   await page.goto(envUrl);

   await homePage.openSavedReport(envReport);
   //await page.reload();
   await reportsPage.pressOK();
   await reportsPage.investigationDownloadCSV();
   

}
);

test('Investigation Tool V2 | Download Timeline Video', async ({ browser })=>

{
   const context = await browser.newContext({ storageState: storageStatePath });
  const page= await context.newPage();
   const poManager = new POManager(page);
   
   const homePage = poManager.getHomePage();
   const reportsPage = poManager.getReportsPage();

   await page.goto(envUrl);

   await homePage.openSavedReport(envReport);
   //await page.reload();
   await reportsPage.pressOK();
   await reportsPage.investigationDownloadTimelineVideo();
   

}
);