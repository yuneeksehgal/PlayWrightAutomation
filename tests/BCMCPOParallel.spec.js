// Import Playwright test and page objects
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const testData = require('../utils/BCTestData.json');

// Environment setup
const env = process.env.ENV || 'production';
const envUrl = env === 'staging' ? testData.stagingURL : testData.productionURL;
const envReport = env === 'staging' ? testData.stagingReport : testData.productionReport;
const storageStatePath = env === 'staging' ? 'state.staging.json' : 'state.production.json';

// Enable parallel execution for all tests in this file
test.describe.configure({ mode: 'parallel' });

test('Investigation Tool | Transaction Slider Export to CSV', async ({ browser }) => {
  const context = await browser.newContext({ storageState: storageStatePath });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const reportsPage = poManager.getReportsPage();

  await page.goto(envUrl);

  // Create a new report and export transactions slider to CSV
  await homePage.newReport();
  await reportsPage.pressOK();
  await reportsPage.setInputHash(testData.ethHashValue);
  await reportsPage.addAllTxsToGraph();
  await reportsPage.txSliderExport();

  await context.close();
});

test('Smart Expand | Check if user is able to Export to CSV from transactions tab', async ({ browser }) => {
  const context = await browser.newContext({ storageState: storageStatePath });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const reportsPage = poManager.getReportsPage();

  await page.goto(envUrl);

  // Create a new report and export using Smart Expand
  await homePage.newReport();
  await reportsPage.pressOK();
  await reportsPage.setInputAddress(testData.inputETHAddress);
  await reportsPage.smartExpandExport();

  await context.close();
});

test('Investigation Tool V2 | Download PDF', async ({ browser }) => {
  const context = await browser.newContext({ storageState: storageStatePath });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const reportsPage = poManager.getReportsPage();

  await page.goto(envUrl);

  // Open saved report and download PDF
  await homePage.openSavedReport(envReport);
  await reportsPage.pressOK();
  await reportsPage.investigationDownloadPDF();

  await context.close();
});

test('Investigation Tool V2 | Download CSV', async ({ browser }) => {
  const context = await browser.newContext({ storageState: storageStatePath });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const reportsPage = poManager.getReportsPage();

  await page.goto(envUrl);

  // Open saved report and download CSV
  await homePage.openSavedReport(envReport);
  await reportsPage.pressOK();
  await reportsPage.investigationDownloadCSV();

  await context.close();
});

test('Investigation Tool V2 | Download Timeline Video', async ({ browser }) => {
  const context = await browser.newContext({ storageState: storageStatePath });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  const reportsPage = poManager.getReportsPage();

  await page.goto(envUrl);

  // Open saved report and download timeline video
  await homePage.openSavedReport(envReport);
  await reportsPage.pressOK();
  await reportsPage.investigationDownloadTimelineVideo();

  await context.close();
});
