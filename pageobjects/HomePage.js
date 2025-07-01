
const {expect}= require('@playwright/test');

class HomePage{

    constructor(page)

    {
        this.page=page;        
        this.NewReportButton= page.getByText("New Report");
        this.savedReportTab= page.getByText('Saved Reports');
        this.savedReportLink = page.getByText('Export PDF check');
    }

    async newReport()
    {
       await this.NewReportButton.click();
    
    }

    async openSavedReport()
    {
       await this.savedReportTab.click();
       await this.savedReportLink.click();
    
    }

    
}
module.exports = {HomePage};