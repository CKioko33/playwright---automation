import { test, expect } from "@playwright/test";

test.describe("", () => {
    test("Window pop-up practice", async ({ page }) => { 
        //Event listeners do not need the await even though it is a promise. The await is only needed for the page.waitForEvent("popup") method.
        let promisedNewPageEvent = page.waitForEvent("popup");

        await page.goto("https://the-internet-5chk.onrender.com/windows");

        await page.click("text='Click Here'");//Trigger the event listener to open a new window pop-up.
          
            //await page.waitForTimeout(3000);

        let newPage = await promisedNewPageEvent;//Wait for the new page to open and load completely.

        await expect(newPage).toHaveTitle("New Window");//Verify the title of the new page.
        await expect(page).toHaveTitle("Windows");//Verify the title of the original page.
            
            //await page.waitForTimeout(3000);

        //Locate an element from the old page and verify its text.
        page.bringToFront(); //Bring the original page to the front otherwise playwright does that for you.
 
        let firstWindowElement = page.getByText("Opening a new window");
        await expect(firstWindowElement).toBeVisible();
            
            //await page.waitForTimeout(3000);
        
        //Locate an element from the new page and verify its text.
        await newPage.bringToFront(); //Bring the new page to the front.
        let secondWindowElement = newPage.getByText("New Window");
        await expect(secondWindowElement).toBeVisible();   
            //await page.waitForTimeout(3000);

    });
   
});
