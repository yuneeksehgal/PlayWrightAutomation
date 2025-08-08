
const {expect}= require('@playwright/test');

class ReportsPage{

    constructor(page)

    {
        this.page=page;        
        this.ResolutionOKButton= page.locator('div[data-testid="confirm-dialog"] button');
        this.inputAddress= page.locator("#input_address");
        this.inputHash= page.locator("#input_address");
        this.hashTable= page.locator('div[data-testid="txhash-search-evm-table"]');
        this.selectAllCheckbox= page.getByLabel("Select");
        this.AddtoGraphButton= page.locator("#dialog-footer button");
        this.nodeCircle = page.locator('path.node-circle');
        this.timelineXbutton= page.locator('div[data-testid="timeline-expanded"] svg[data-icon="xmark"]');
        this.circleElement= page.locator('#edge-group-0C482013A2684B39592F1F1C35342831 > circle');
        this.sliderTable= page.locator('div[data-testid="transaction-slider-table"]');
        this.sliderTableExportButton= page.locator('button[data-testid="table-export"]');
        this.imgBCTopNav = page.locator('a > img[alt="Breadcrumbs"]');
        this.suggestionList = page.locator('div[data-testid="entity-dropdown-item-component"]');
        this.smartExpand = page.locator('div[data-testid="smart-expand"]');
        this.smartExpandExportButton = page.getByText('Export to CSV');
        this.toastify= page.locator('div[type="success"]');
        this.downloadCSVLink = page.getByText('Download CSV');
        this.closeNotification= page.locator('div[data-testid="notification"] svg[data-icon="xmark"]');
        this.closesmartExpand= page.locator('div[data-testid="dialog"] svg[data-icon="xmark"]');
        this.unsavedProceed = page.getByText('Proceed');
        this.plusDataIcon= page.locator('div[data-testid="tooltip-container"] svg[data-icon="plus"]');
        this.circleDotIcon = page.locator('svg[data-icon="circle-dot"]');
        this.downloadIcon = page.locator('svg[data-icon="download"]');
        this.downloadPDFReport = page.getByText('Download PDF Report');
        this.downloadPDF = page.getByRole('button', { name: 'Download PDF' });
        this.downloadCSVReport = page.getByText('Download CSV');
        this.donwloadTimelineVideo = page.getByText('Download Timeline Video');
        this.donwloadToastify= page.locator('div[data-testid="notification"]');
    }

    async pressOK()
    {
       await this.ResolutionOKButton.click();
    
    }

     async investigationDownloadPDF()
    {
       await this.timelineXbutton.click();
       await this.plusDataIcon.first().click();
       await this.circleDotIcon.hover();
       await this.downloadIcon.click();
       await this.downloadPDFReport.click();

             
      // Wait concurrently for the download event and clicking the PDF report button
         const [download] = await Promise.all([
         this.page.waitForEvent('download'),
         this.downloadPDF.click()
         ]);

      
      // Optionally, check for notification only if it appears
      if (await this.donwloadToastify.isVisible({ timeout: 5000 })) {
      // Optionally assert or close notification
       await this.closeNotification.first().click();
    }

       expect(download.suggestedFilename()).toContain('graph-report');
       
       console.log('Downloaded PDF File: '+ download.suggestedFilename());    
    }

    async investigationDownloadCSV()
    {
       await this.timelineXbutton.click();
       await this.plusDataIcon.first().click();
       await this.circleDotIcon.hover();
       await this.downloadIcon.click();

      // Array to store all download events
       const downloads = [];

       // Listen for download events and store them
       this.page.on('download', download => {
       downloads.push(download);
       });

      // Trigger the action that starts multiple downloads
      await this.downloadCSVReport.click();


     // Iterate over each download and check for desired properties
     for (const download of downloads) {
      const suggestedFilename = download.suggestedFilename();
      console.log(`Downloaded File: ${suggestedFilename}`);

      // Optionally, save the file to a known location for further verification
       const filePath = `./downloadedCSV/${suggestedFilename}`;
       await download.saveAs(filePath);
  
      // You might also check that the filename meets certain conditions, for example:
      expect(suggestedFilename).toMatch(/\.csv$/); // if expecting CSV files
   } 

         
      
    }

    async investigationDownloadTimelineVideo()
    {
       await this.timelineXbutton.click();
       await this.plusDataIcon.first().click();
       await this.circleDotIcon.hover();
       await this.downloadIcon.click();

       // Wait concurrently for the download event and clicking the Download Timeline Video button
         const [download] = await Promise.all([
         this.page.waitForEvent('download'),
         this.donwloadTimelineVideo.click()
         ]);

         if (await this.donwloadToastify.isVisible({ timeout: 5000 })) {
         await expect(this.donwloadToastify).toContainText('Timeline video export has been requested, your download will begin shortly.');
         await this.closeNotification.first().click();
          } else {
          console.warn('Notification did not appear—download may have failed or is delayed.');
          }

        
         expect(download.suggestedFilename()).toMatch(/\.mp4$/);
         console.log('Downloaded Timeline Video File: '+ download.suggestedFilename());

    }

    async setInputAddress(inputAddress)
    {
       await this.inputHash.fill(inputAddress);
       await this.suggestionList.click();
           
    }

     async setInputHash(hashValue)
    {
       await this.inputHash.fill(hashValue);
       await this.page.keyboard.press('Enter');
       await expect(this.hashTable).toBeVisible();
    
    }

    async smartExpandExport()
    {

        const formattedTimestamp = new Date().toISOString().replace(/[:.-]/g, '');
        console.log(`Formatted timestamp: ${formattedTimestamp}`);


       const sheetPath = formattedTimestamp +'export.'
       const downloadLocation = 'donwloadedCSV'
    
       await this.page.locator('g[data-testid="0x9334450968ac2e3b6eb0cb70ad813f27d8576915_1"] path').click();
       await this.smartExpand.click();
       await this.smartExpandExportButton.click() // click the download button
       await expect(this.toastify).toContainText('Your CSV is now available for download.');

       const [ download ] = await Promise.all([
       this.page.waitForEvent('download'),
       await this.downloadCSVLink.click(),
       ]);

       const originalFileName = download.suggestedFilename();
       console.log(originalFileName);
       const newFileName = sheetPath + originalFileName.split('.').pop(); // Keep the extension
       const newFilePath = `${downloadLocation}/${newFileName}`; // Use a location you want

       await download.saveAs(newFilePath);
       console.log(newFileName);
       console.log(newFilePath);
       expect(download.suggestedFilename()).toContain('export');
       await this.closeNotification.nth(1).click();
       await this.closesmartExpand.click();
       await this.imgBCTopNav.click();
       await this.unsavedProceed.click();    
    }

     async addAllTxsToGraph()
    {
        //await expect(this.hashTable).toBeVisible();
        await this.selectAllCheckbox.check();
        await this.AddtoGraphButton.click();
        await this.nodeCircle.first().waitFor();
        await this.timelineXbutton.click();
    }

    async txSliderExport()

    {
      // Ensure the circle element is visible (use expect if needed)  
      await expect(this.circleElement).toBeVisible();

      // Click with force to bypass element instability due to animation.
      await this.circleElement.click({ force: true });
     
      await expect(this.sliderTable).toBeVisible({ timeout: 60000 });

      const downloadPromise = this.page.waitForEvent('download')  // Start waiting for the download
      await this.sliderTableExportButton.click() // click the download button
      const download = await downloadPromise; // wait for download event to complete
      expect(download.suggestedFilename()).toBe("transactions.csv");
      await this.imgBCTopNav.click();

    }

    
}
module.exports = {ReportsPage};