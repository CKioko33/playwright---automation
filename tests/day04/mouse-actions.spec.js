import { test } from "@playwright/test";

test.describe("Test Mouse Actions", () => {
    //Create beforeEach hook to navigate to https://the-internet-5chk.onrender.com/
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet-5chk.onrender.com/");
        //await page.waitForTimeout(3000);
    });

        test.afterEach(async ({ page }) => {
        //await page.waitForTimeout(3000);
        });
    
    test("Left Click", async ({ page }) => {
        await page.click("a[href='/abtest']");
    });

    test("Right Click", async ({ page }) => {
        await page.click("a[href='/abtest']", { button: "right" });
     });

    test("Double Click", async ({ page }) => {

     });

    test("Hover", async ({ page }) => {
        await page.click("text='Hovers'");
        //page.waitForTimeout(3000);
        //await page.hover("img[alt='User Avatar']"); //Hover over one element, you will need to provide xpath or css selector of the element you want to hover over.

        //When hovering over multiple elements.
        let elements = await page.locator("img[alt='User Avatar']").all();

        for (let each of elements) {
            //await page.waitForTimeout(2000);
            await each.hover();            
        }
    });

    test("Mouse Wheel Scrolling", async ({ page }) => {

        await page.mouse.wheel(0, 2000); //Scroll down the page by 2000 pixels.
        

    });

    test("Scrolling to specific element", async ({ page }) => {

        let inputsLink = page.getByText("Inputs");
        
        await inputsLink.scrollIntoViewIfNeeded(); //Scroll to the specific element.
        //await page.waitForTimeout(3000);
        await inputsLink.click(); //Click on the specific element after scrolling to it.    
       
    });

    test("Drag and Drop", async ({ page }) => {
        page.click("text='Drag and Drop'");
        //page.waitForTimeout(3000);

        //await page.dragAndDrop("//div[@id='column-a']", "//div[@id='column-b']"); //Drag the element from source to target.

        //Using locators to perform drag and drop action.
        let source = page.locator("//div[@id='column-a']");
        let target = page.locator("//div[@id='column-b']"); 

        await source.dragTo(target); //Drag the source element to the target element.
        
    });
});
