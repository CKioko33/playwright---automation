import{ test, expect } from '@playwright/test'

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