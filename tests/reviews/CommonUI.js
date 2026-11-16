import { expect } from "@playwright/test";

export class CommonUI{

    static async login(page) {
        const credentials = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");

        await page.setExtraHTTPHeaders(
            { "Authorization": `Basic ${credentials}` }

        );
        await page.goto(process.env.SEP_QA_URL);

    }

    static async enterPersonalDetails(page, firstname, lastname, email, phoneNumber) {
       
        const firstNameInput = page.getByLabel("First Name");
        const lastNameInput = page.getByLabel("Last Name");
        const emailInput = page.getByLabel("Email Address");
        const phoneInput = page.getByLabel("Phone");
            
        await firstNameInput.fill(firstname);
        await lastNameInput.fill(lastname);
        await emailInput.fill(email);
        await phoneInput.fill(phoneNumber);
        
    }

    static async completeStartApplicationStep(page, firstname, lastname, email, phoneNumber){
        await this.enterPersonalDetails(page, firstname, lastname, email, phoneNumber);

        const firstStepperCircle = page
            .locator("div.step-circle")
            .filter({ hasText: /^1$/ });
        const nextButton = page.getByRole("button", { name: "Next", exact: true });
        
        await expect(page.locator("form")).toHaveClass(/ng-valid/);
        await expect(nextButton).toBeEnabled();

        const purchaseResponse = page.waitForResponse(response =>
            response.url().includes("/api-qa/v1/purchases") &&
            response.request().method() === "POST"
        );
        await nextButton.click();
        const response = await purchaseResponse;
        expect(
            response.ok(),
            `Purchase request failed: POST ${response.url()} returned ${response.status()} ${response.statusText()}`
        ).toBe(true);

        await expect(firstStepperCircle).toHaveCSS(
            "background-color",
            "rgb(172, 245, 138)",
            { timeout: 15000 }
        );
    }
    //payment plans: upfront, installments const secondStepperCircle = page
    static async completePaymentPlanStep(page, paymentPlan) {
        const secondStepperCircle = page
            .locator("div.step-circle")
            .filter({ hasText: /^2$/ });

        const paymentPlanOption = page.getByRole("button", {
            name: new RegExp(paymentPlan, "i")
        });
        const nextButton = page.getByRole("button", { name: "Next", exact: true });

        await expect(secondStepperCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
        await paymentPlanOption.click();
        await expect(nextButton).toBeEnabled();

        await nextButton.click();

        await expect(secondStepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");
    }
}