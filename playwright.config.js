// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
// This configuration file is used to define the settings for Playwright tests. 
// It includes settings for the test directory, timeout, expect timeout, reporter, and browser context options.
module.exports = defineConfig({
  testDir: './tests',
  workers: 5,
   retries: 1,
  timeout: 100*1000,
  expect: {
    timeout: 40*1000,
  },
  reporter: 'html',
    //reporter: [["line"], ["allure-playwright"]],
  use: {
   
     browserName: "chromium",
     userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
     headless : false,
     screenshot : 'on',
     trace : 'on',
     video: 'retain-on-failure',
     
     // Below are the 3 configs to maximize the browser window
     viewport: null,
     launchOptions: {
       args: ['--start-maximized'],
     },
     deviceScaleFactor: undefined

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
  },

  
});

