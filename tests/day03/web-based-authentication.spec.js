import { test } from "@playwright/test";

test("Bypass authentication by embedding credentials in the URL", async ({ page }) => { 
    //https://username:password@the-internet-5chk.onrender.com/basic_auth"
    await page.goto("https://admin:admin@the-internet-5chk.onrender.com/basic_auth");
    await page.waitForTimeout(3000);

});

//Best practice is to use the setExtraHTTPHeaders method to set the Authorization header with the encoded credentials in base64 format. This way, you can bypass the authentication prompt and access the protected page directly.
test("Bypass authentication by encoding the credentials base64 format", async ({ page }) => { 
    let encodedCredentials = Buffer.from("admin:admin").toString("base64");

    await page.setExtraHTTPHeaders({"Authorization": `Basic ${encodedCredentials}`});
    
    await page.goto("https://the-internet-5chk.onrender.com/basic_auth");
   
    await page.waitForTimeout(3000);
});