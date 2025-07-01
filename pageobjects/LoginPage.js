
const {test,expect}= require('@playwright/test');

class LoginPage{

    constructor(page)

    {
        this.page=page;        
        this.email= page.locator("#email");
        this.password= page.locator("#password");
        this.loginButton= page.locator('#btn-login');
        this.loginLink = page.locator("a[data-testid='navbar-Log in']");
        this.topnavUsername= page.locator('div[data-testid="navbar-right-section"] p');
    }

    async goTo()
    {
       await this.page.goto("https://www.breadcrumbs.app/");
    
    }

    async validLogin(useremail,password,username)
    {
        
        await expect(this.loginLink).toBeVisible();
        await expect(this.page).toHaveTitle(/Breadcrumbs Crypto/);
        await this.loginLink.click();
        await this.email.fill(useremail);
        await this.password.fill(password);
        await this.page.waitForLoadState();
        await this.loginButton.click();
        await expect(this.topnavUsername).toContainText(username);
        console.log(await this.topnavUsername.textContent());
    }
}
module.exports = {LoginPage};