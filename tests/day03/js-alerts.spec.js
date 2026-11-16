import { test, expect } from "@playwright/test";

test.describe("Test Group", () => {

test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/javascript_alerts");
});

test("Regular Alert", async ({ page }) => {
   //Handling an alert manually using the page.on("dialog") event listener
   page.on("dialog", async (alert) => {
       console.log(`Alert message is: ${alert.message()}`); //Display the alert message in the console.
       await page.waitForTimeout(3000); 
       await alert.accept();
   });

    let clickForJSAlertButton = page.locator("button[onclick='jsAlert()']");
    await clickForJSAlertButton.click();

    //await page.waitForTimeout(3000);  

 });

test("Confirm Alert", async ({ page }) => { 
    page.on("dialog", async (alert) => {
        console.log(`Alert message is: ${alert.message()}`);
        await page.waitForTimeout(3000);
        await alert.dismiss();
    });
    let clickForJSConfirmButton = page.locator("button[onclick='jsConfirm()']");
    await clickForJSConfirmButton.click();
    await page.waitForTimeout(3000); 

});

test("Prompt Alert", async ({ page }) => { 
    page.on("dialog", async (alert) => {
        console.log(`Alert message is: ${alert.message()}`);
        await page.waitForTimeout(3000);
        await alert.accept("Test");
    });

    let clickForJSPromptButton = page.locator("button[onclick='jsPrompt()']");
    await clickForJSPromptButton.click();
    await page.waitForTimeout(3000);
    
    });
});