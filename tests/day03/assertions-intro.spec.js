import { test, expect } from "@playwright/test";

test.describe("Test Group", () => {
    //Create beforeEach hook to navigate to https://the-internet-5chk.onrender.com/
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet-5chk.onrender.com/");
        expect(page).toHaveTitle("Practice");
    });

    test("Verify checkboxes are checked", async ({page}) => {
       
        await page.getByText("Checkboxes").click();
        let checkbox1 = page.locator("//input[@id='box1']");
        let checkbox2 = page.locator("//input[@id='box2']");
        
        await checkbox1.check();
        await checkbox2.check();
        
        await expect(checkbox1).toBeChecked();
        await expect(checkbox2).toBeChecked();

        //------------------------------------------------------------------------
       
        expect(await checkbox1.isChecked() ).toBeTruthy();
        expect(await checkbox2.isChecked() ).toBeTruthy();
    });

    test("Verify checkboxes are unchecked", async ({page}) => { 
        await page.getByText("Checkboxes").click();
        let checkbox1 = page.locator("//input[@id='box1']");
        let checkbox2 = page.locator("//input[@id='box2']");

        await checkbox1.uncheck();
        await checkbox2.uncheck();  

        await expect(checkbox1).not.toBeChecked();
        await expect(checkbox2).not.toBeChecked();

        //------------------------------------------------------------------------
        expect(await checkbox1.isChecked() ).toBeFalsy();
        expect(await checkbox2.isChecked() ).toBeFalsy();   

    });
    
    test("Verify text of element", async ({page}) => { 
        let headerElement = page.locator("span[class='h1y']");

        await expect(headerElement).toHaveText("Test Automation Practice");

        let actualText = await headerElement.innerText();
        expect(actualText).toEqual("Test Automation Practice");
    });
});
