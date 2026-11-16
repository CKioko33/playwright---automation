import { test, expect } from "@playwright/test";

test.describe("Test Group", () => {
    let elements; // Declare a variable to hold the link elements

    //Create beforeEach hook to navigate to https://the-internet-5chk.onrender.com/ 
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet-5chk.onrender.com/");
        elements = await page.locator("//ul[@class='list-group']//a").all();

    });

    test("Verify that there are exactly 50 link elements within the <ul> tag.", async ({ 
        page 
    }) => { 
        expect(elements.length).toBe(50);
        //expect(elements.length).toBeGreaterThanOrEqual(20);
    });

    test("Verify that each link element is visible and clickable.", async ({ 
        page 
    }) => {
            for (let e of elements) {
            await expect(e).toBeVisible();
            //expect(e.visible).toBeTruthy();
            expect(e).toBeEnabled();
            //expect(await e.isEnabled()).toBeTruthy();
        }
     });

    test("Verify that each link element has a href attribute.", async ({ 
        page 
    }) => {
        for (let e of elements) {
            await expect(e).toHaveAttribute("href");
        }
          });
});

