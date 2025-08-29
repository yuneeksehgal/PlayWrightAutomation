
const {expect}= require('@playwright/test');

class HomePage{

    constructor(page)

    {
        this.page=page;        
        this.NewReportButton= page.getByText("New Report");
        this.savedReportTab= page.getByText('Saved Reports');
        
    }

    async newReport()
    {
       await this.NewReportButton.click();
    
    }

    async openSavedReport(envReport)
    {
       await this.savedReportTab.click();
       const savedReportLink = this.page.getByText(envReport);
        await savedReportLink.click();
    
    }

    
}
module.exports = {HomePage};
