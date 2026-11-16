import { test, expect } from "@playwright/test";
import { CommonUI } from "./CommonUI";
import { faker } from "@faker-js/faker";

test.describe("Payment Plan test cases @Review-plan-step", () => {
    const paymentPlan = "5 Installments";

    test.beforeEach(async ({ page }) => {
        await CommonUI.login(page);
        await CommonUI.completeStartApplicationStep(page,
            faker.person.firstName(),
            faker.person.lastName(),
            faker.internet.email(),
            faker.string.numeric(10))
        await CommonUI.completePaymentPlanStep( page, paymentPlan)
        const paymentPlanOption = page.getByRole("button", { name: /Upfront/i });

    });
    
    test("Verify that Step 1 & Step 2 steppers are green and Step 3 stepper is blue", async ({ page }) => {
        const firstStepperCircle = page
            .locator("div.step-circle")
            .filter({ hasText: /^1$/ });
        const secondStepperCircle = page
            .locator("div.step-circle")
            .filter({ hasText: /^2$/ });
        const thirdStepperCircle = page
            .locator("div.step-circle")
            .filter({ hasText: /^3$/ });

        await expect(firstStepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");
        await expect(secondStepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");
        await expect(thirdStepperCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
     
    });

    test("Verify that the payment input fields are enabled and accept card details", async ({ page }) => {
        const paymentFrame = page.frameLocator('iframe[title="Secure payment input frame"]');
        const cardNumberInput = paymentFrame.getByRole("textbox", { name: "Card number", exact: true });
        const expirationDateInput = paymentFrame.getByRole("textbox", { name: /Expiration/ });
        const securityCodeInput = paymentFrame.getByRole("textbox", { name: "Security code" });
        const countryInput = paymentFrame.getByRole("combobox", { name: "Country" });
        const zipCodeInput = paymentFrame.getByRole("textbox", { name: "ZIP code" });

        // Stripe test mode only accepts its own test cards. A random Visa number gets declined.
        const cardNumber = faker.helpers.arrayElement([
            '4242424242424242', // Visa
            '5555555555554444', // Mastercard
            '378282246310005',  // Amex (needs a 4-digit CVC)
        ]);

        // Any future date in MM/YY format
        const future = faker.date.future({ years: 5 });
        const expirationDate = `${String(future.getMonth() + 1).padStart(2, '0')}/${String(future.getFullYear()).slice(-2)}`;

        // Amex needs 4 digits, other cards need 3
        const securityCode = cardNumber.startsWith('3')
            ? faker.string.numeric(4)
            : faker.finance.creditCardCVV();

        // Keep "US" so the ZIP field shows up and accepts a 5-digit ZIP
        const country = 'US';
        const zipCode = faker.location.zipCode('#####');

        await cardNumberInput.fill(cardNumber);
        await expirationDateInput.fill(expirationDate);
        await securityCodeInput.fill(securityCode);
        await countryInput.selectOption(country);
        await zipCodeInput.fill(zipCode);

        await expect(securityCodeInput).toHaveValue(securityCode);
        await expect(countryInput).toHaveValue(country);
        await expect(zipCodeInput).toHaveValue(zipCode);
                       
    });

});

