
const {expect}= require('@playwright/test');

class MonitoringTool{

    constructor(page)

    {
        this.page=page;        
        this.NewDashboardButton= page.getByText("New Dashboard");
        this.myDashboardTab= page.getByText('My Dashboards');
        this.transactionsTab = page.getByText('Transactions');
        this.tableExportButton = page.locator('button[data-testid="table-export"]');
        this.downloadCSVLink = page.getByText('Download CSV');
    }

     async goToMonitoringTool(MonitoringToolURL)   {
        
       await this.page.goto(MonitoringToolURL);
       await this.page.waitForLoadState();

    }

    async newDashboard()
    {
       await this.NewDashboardButton.click();
    
    }

    async downloadMonitoringCSV(monitoringDashboard)
    {
       await this.myDashboardTab.click();

       // Wait for the dashboard list/table to appear
       
       await this.page.waitForSelector('ul[data-testid="dashboard-list-private"]', { timeout: 10000 }); 
       

       // Log available dashboard links for debugging
       const dashboardLinks = await this.page.locator('ul[data-testid="dashboard-list-private"] a').allTextContents();
       console.log('Available dashboards:', dashboardLinks);

       const savedDashboardLink = this.page.getByRole('link', { name: new RegExp(monitoringDashboard, 'i') }).first();
       await expect(savedDashboardLink).toBeVisible({ timeout: 60000 });
       await savedDashboardLink.click();

       await this.transactionsTab.click();

       await this.tableExportButton.click() // click the download button
       await expect(this.toastify).toContainText('Your CSV is now available for download.');


      const [ download ] = await Promise.all([
       this.page.waitForEvent('download'),
       await this.downloadCSVLink.click(),
       ]);

      await download.saveAs("export-alpha.csv");
      expect(download.suggestedFilename()).toContain(monitoringDashboard);
    
    }

    
}
module.exports = {MonitoringTool};