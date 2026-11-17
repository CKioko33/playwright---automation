import{ test, expect, firefox } from '@playwright/test'

test('Context fixture @broswer', async ({ context }) => {

    let page1 = await context.newPage();
    let page2 = await context.newPage();
    let page3 = await context.newPage();
    let page4 = await context.newPage();
    
    await page1.bringToFront();//Brings the page upfront.
    await page1.goto('https://www.facebook.com/login.php/');
    await page1.waitForTimeout(2000);
    
    await page2.bringToFront();
    await page2.goto('https://www.youtube.com/');
    await page2.waitForTimeout(2000);
    
    await page3.bringToFront();
    await page3.goto('https://www.linkedin.com/');
    await page3.waitForTimeout(2000);
    
    await page4.bringToFront();
    await page4.goto('https://mail.google.com/');
    await page4.waitForTimeout(2000);
})

//Browser 
test('Browser fixture @browser', async ({ browser }) =>{

    const context1 = await browser.newContext();
    const context2 = await browser.newContext();


    const page1 = await context1.newPage();
    const page2 = await context1.newPage();

    const page3 = await context2.newPage();
    const page4 = await context2.newPage();
    const page5 = await context2.newPage();

    await page1.bringToFront();//Brings the page upfront.
    await page1.goto('https://www.facebook.com/login.php/');
    await page1.waitForTimeout(2000);

    await page2.bringToFront();
    await page2.goto('https://www.youtube.com/');
    await page2.waitForTimeout(2000);

    await page3.bringToFront();
    await page3.goto('https://www.linkedin.com/');
    await page3.waitForTimeout(2000);

    await page4.bringToFront();
    await page4.goto('https://mail.google.com/');
    await page4.waitForTimeout(2000);
});

//Custom context and browser
test('custom context & custom browser @custom', async () => {

    let browser = await firefox.launch();
    let context = await browser.newContext();
    let page = await context.newPage();

    page.goto('https://www.facebook.com/login.php');
    await page.waitForTimeout(4000);
});

//API Test
test('Request fixture', async ({request}) => {

    const baseURL = 'https://spartan-app-new-nonsecure.onrender.com';
    const endpoint = '/api/v2/spartans/search';

    const response = await request.get(`${baseURL}${endpoint}`);

    //Verify status code
    expect(response.status()).toBe(200);

    const headers = response.headers();

    //Verify content type is JSON
    expect(headers['content-type']).toContain('application/json');

    const responseBody = await response.json();

    //Verify the response body contains the expected data
    //expect(responseBody).toHaveProperty('totalElement');
    //expect(responseBody).toHaveProperty('content')

    //Verifythat the message in body is "Successfully queried all the Spartans"
    expect(responseBody.message).toBe('Successfully queried all the Spartans.');

    console.log('Response Body:', responseBody);

});