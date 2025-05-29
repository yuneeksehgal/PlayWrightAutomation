//Import test package for all tests
const {test,expect}= require('@playwright/test');
const {LoginPage}= require('../pageobjects/LoginPage');

//We can replace function() with ()=> since function has no name 
test('Login Page with Page Objects', async ({page})=>

{
   const useremail="yuneek@breadcrumbs.app";
   const password ="Testing1@3";
   const username = "YuneekSehgal";
  
   const loginPage = new LoginPage(page);
   await loginPage.goTo();
   await loginPage.validLogin(useremail,password,username);   
   
}
);

