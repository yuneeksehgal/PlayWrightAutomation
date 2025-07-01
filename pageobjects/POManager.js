const {LoginPage} = require('./LoginPage');
const {HomePage} = require('./HomePage');
const {ReportsPage} = require('./ReportsPage');

class POManager
{

    constructor(page)
{
    this.page = page;
    this.LoginPage = new LoginPage(this.page);
    this.HomePage = new HomePage(this.page);
    this.ReportsPage = new ReportsPage(this.page);
}

getLoginPage()
{
    return this.LoginPage;
}

getHomePage()
{
    return this.HomePage;
}

getReportsPage()
{
    return this.ReportsPage;
}


}

module.exports = {POManager};