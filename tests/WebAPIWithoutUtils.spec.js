//Import test package for all tests
const {test,expect,request}= require('@playwright/test');

const loginPayLoad = {userEmail:"yuneeksehgal@gmail.com",userPassword:"Testing1@3"};
const orderPayLoad = {orders:[{country:"Australia",productOrderedId:"67a8df1ac0d3e6622a297ccb"}]};

let token;
let orderId;

test.beforeAll(async ()=>{

    //Login API
   const apiContext = await request.newContext(); 
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayLoad});

   expect((await loginResponse).ok()).toBeTruthy();

   const loginResponseJson= await loginResponse.json();
   token= loginResponseJson.token;

   console.log(token);

   //Order Creation

   const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayLoad,
        headers:{'Authorization': token}
    });

    expect((await orderResponse).ok()).toBeTruthy();
    const orderResponseJson= await orderResponse.json();
    orderId =orderResponseJson.orders[0];
    console.log(orderId);

});

test('Page Playwright Test', async ({page})=>

    {
       page.addInitScript(value =>{window.localStorage.setItem('token',value)},token);


      const email = "yuneeksehgal@gmail.com";
      const productName = 'ADIDAS ORIGINAL';
      const products = page.locator(".card-body");

       await page.goto("https://rahulshettyacademy.com/client");
    

         await page.locator("button[routerlink*='myorders']").click();
         await page.locator("tbody").waitFor();
         
         const rows = await page.locator("tbody tr");

         for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
               await rows.nth(i).locator("button").first().click();
               break;
            }
         }

         const orderIdDetails = await page.locator(".col-text").textContent();
         expect(orderId.includes(orderIdDetails)).toBeTruthy()



        }

        
    );