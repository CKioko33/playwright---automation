import { test, expect } from "@playwright/test";
import { CommonUI } from "./CommonUI";
import { faker } from "@faker-js/faker";

test.describe("Payment Plan test cases @payment-plan-step", () => {

    test.beforeEach(async ({ page }) => {
        await CommonUI.login(page);
        await CommonUI.completeStartApplicationStep(page, 
            faker.person.firstName(),
            faker.person.lastName(),
            faker.internet.email(),
            faker.string.numeric(10))
       
    });
    test("Verify that Step 2 stepper is blue and Step 1 stepper is green.", async ({ page }) => {
        const firstStepperCircle = page
            .locator("div.step-circle")
            .filter({ hasText: /^1$/ });
        const secondStepperCircle = page
            .locator("div.step-circle")
            .filter({ hasText: /^2$/ });

        await expect(firstStepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");
        await expect(secondStepperCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
    });

    test("Verify that the Next button is disabled by default.", async ({ page }) => {
        const nextButton = page.getByRole("button", { name: "Next", exact: true });

        await expect(nextButton).toBeVisible();
        await expect(nextButton).toBeDisabled();
        
        //await page.waitForTimeout(3000);
    });       
     
    test("Verify that the Next button becomes enabled when a payment plan is selected", async ({ page }) => {
        const paymentPlanOption = page.getByRole("button", { name: /Upfront/i });
        //const paymentPlanOption = page.getByRole("button", { name: /5 Installments/i });
        const nextButton = page.getByRole("button", { name: "Next", exact: true });

        await expect(paymentPlanOption).toBeVisible();
        await expect(paymentPlanOption).toBeEnabled();
        
        await paymentPlanOption.click();
        await expect(nextButton).toBeEnabled();
        
    });

    test("Verify Clicking the active next button will change the stepper 2 color to green", async ({ page }) => {
        const secondStepperCircle = page
            .locator("div.step-circle")
            .filter({ hasText: /^2$/ });
        const paymentPlanOption = page.getByRole("button", { name: /Upfront/i });
        const nextButton = page.getByRole("button", { name: "Next", exact: true });

        await expect(secondStepperCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
        await paymentPlanOption.click();
        await expect(nextButton).toBeEnabled();

        await nextButton.click();

        await expect(secondStepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");
       
    });
});
