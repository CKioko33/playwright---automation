import { test, expect } from "@playwright/test";

test("iframe", async ({ page }) => { 
    await page.goto("https://the-internet-5chk.onrender.com/iframe");   

    page.frameLocator("iframe[id='mce_0_ifr']");
    
    let myFrame = page.frameLocator("iframe[id='mce_0_ifr']");//Locate elements inside the iframe.

    let elementInsideFrame = myFrame.locator("//body[@id='tinymce']"); //Located the element inside the iframe.

    //
    
    await page.waitForTimeout(3000); //Wait for 3 seconds to see the text typed inside the iframe.

    //await elementInsideFrame.clear(); //Clear the text inside the element located inside the iframe.
    await elementInsideFrame.press("Control+A", "Backspace"); //Select all the text inside the element located inside the iframe.

    //await page.waitForTimeout(3000); //Wait for 3 seconds to see the text typed inside the iframe.


    await elementInsideFrame.fill("This is a test message typed inside the iframe."); //Type the text inside the element located inside the iframe.

    //await page.waitForTimeout(3000); //Wait for 3 seconds to see the text typed inside the iframe.

    await expect(elementInsideFrame).toHaveText("This is a test message typed inside the iframe."); //Verify the text typed inside the element located inside the iframe.
});
