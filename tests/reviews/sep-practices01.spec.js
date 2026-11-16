import { test, expect } from "@playwright/test";
import { CommonUI } from "./CommonUI";
import { faker } from "@faker-js/faker";

test.describe("Start application test cases @start-app-step", () => {

    test.beforeEach(async ({ page }) => {
        await CommonUI.login(page);

    });

    test("Verify that clicking the Terms & Conditions link opens a new Terms & Conditions tab.", async ({ page }) => {

        const popupEvent = page.waitForEvent("popup");//Action has to trigger 

        let termsAndConditionsLink = page.getByRole('link', { name: 'Terms and conditions', exact: true }); //Playwright locator

        //Verify that the link is visible and enabled   
        await expect(termsAndConditionsLink).toBeVisible();
        await expect(termsAndConditionsLink).toBeEnabled();

        //click the link and wait for the popup to open
        await termsAndConditionsLink.click();
        const newPage = await popupEvent;

        await newPage.waitForLoadState('domcontentloaded');

        //Verify the new page opened and navigated to the Terms & Conditions page.
        await expect(newPage).toHaveURL(/terms-conditions/i);
     
    });

    test("Verify that the first stepper is blue initially and changes to green once Step 1 is completed.", async ({ page }) => {

        const firstStepperCircle = page
            .locator("div.step-circle")
            .filter({ hasText: /^1$/ });

        const programTitle = page.locator(".course-name");
        const referralSourceDropdown = page.getByRole("combobox", {
            name: "How did you hear about us?",
            exact: true
        });

        //Using faker to generate different names, import faker utility
        await CommonUI.enterPersonalDetails(
            page,
            faker.person.firstName(),
            faker.person.lastName(),
            faker.internet.email(),
            faker.string.numeric(10)
        );

        await expect(programTitle).toHaveText(/\S+/);
        await expect(firstStepperCircle).toBeVisible();
        await expect(firstStepperCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
        await expect(referralSourceDropdown).toBeVisible();

        const nextButton = page.getByRole("button", { name: "Next", exact: true });

        await expect(page.locator("form")).toHaveClass(/ng-valid/);
        await expect(nextButton).toBeEnabled();

        const purchaseResponse = page.waitForResponse(response =>
            response.url().includes("/api-qa/v1/purchases") &&
            response.request().method() === "POST"
        );

        await nextButton.click();
        await purchaseResponse;

        await expect(firstStepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");

        //await page.waitForTimeout(5000);
    });

    test("Verify that personal input fields are enabled and accept user input", async ({ page }) => {
        
        const firstNameInput = page.getByLabel("First Name");
        const lastNameInput = page.getByLabel("Last Name");
        const emailInput = page.getByLabel("Email Address");
        const phoneInput = page.getByLabel("Phone");

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const phoneNumber = faker.string.numeric(10);

        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await emailInput.fill(email);
        await phoneInput.fill(phoneNumber);  

        await expect(firstNameInput).toHaveValue(firstName);
        await expect(lastNameInput).toHaveValue(lastName);
        await expect(emailInput).toHaveValue(email);
        await expect(phoneInput).toHaveValue(phoneNumber);

    });

});
