
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
        this.toastify= page.locator('div[type="info"]');
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
       
       await this.page.waitForSelector('ul[data-testid="dashboard-list-private"] a', { timeout: 10000 }); 
       

       const savedDashboardLink = this.page.getByRole('link', { name: new RegExp(monitoringDashboard, 'i') }).first();
       await expect(savedDashboardLink).toBeVisible({ timeout: 60000 });
       await savedDashboardLink.click();

       await this.page.waitForSelector('div[data-testid="overview-container"] div', { timeout: 10000 });

       await this.transactionsTab.click();

       await this.page.waitForSelector('div[data-testid="remote-table"] tbody tr', { timeout: 10000 });

       await this.tableExportButton.click() // click the download button     

       await expect(this.toastify).toContainText('Export to CSV requested. We will notify you once available.');

      await this.downloadCSVLink.waitFor({ timeout: 60000 });

      const [ download ] = await Promise.all([
       this.page.waitForEvent('download'),
       await this.downloadCSVLink.click(),
       ]);

      //await download.saveAs("download Monitoring CSV.csv");
      console.log(download.suggestedFilename());
      expect(download.suggestedFilename()).toContain("export");
    
    }

    
}
module.exports = {MonitoringTool};
