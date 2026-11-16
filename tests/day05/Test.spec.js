import { test, expect } from '@playwright/test';

test.use({ browserName: 'chromium', channel: 'chrome' });

test('Verify that all the links under the ul tag are displayed and enabled', async ({ page }) => {
    // Step 2: Navigate to the application
    await page.goto('https://the-internet-5chk.onrender.com/');

    // Step 3: The url should contain "5chk.onrender.com"
    await expect(page).toHaveURL(/5chk\.onrender\.com/);

    // Step 4: The title should be "Practice"
    await expect(page).toHaveTitle('Practice');

    // Step 5: All the links under the ul HTML tag are visible and clickable
    const links = page.locator("//ul[@class='list-group']//a");

    await expect(links.first()).toBeVisible();
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);

    for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i);
        const linkText = (await link.textContent())?.trim();

        await expect(link, `Link "${linkText}" should be visible`).toBeVisible();
        await expect(link, `Link "${linkText}" should be enabled`).toBeEnabled();

        // Trial click performs actionability checks without actually clicking
        await link.click({ trial: true });
    }
});

test('Search CYDEO on google', async ({ page }) => {
    // Step 2: Navigate to Google
    await page.goto('https://www.google.com/');

    // Step 3: The title should be "Google"
    await expect(page).toHaveTitle('Google');

    // Step 4: Enter "CYDEO" in the search box and press Enter key
    const searchBox = page.locator("//textarea[@class='gLFyf']");
    await expect(searchBox).toBeVisible();
    await searchBox.fill('CYDEO');
    await searchBox.press('Enter');

    // Step 5: Page title contains "CYDEO"
    await expect(page).toHaveTitle(/CYDEO/);
});
