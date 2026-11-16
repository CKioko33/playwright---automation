import {expect, test} from '@playwright/test';
import path from 'path';
import fs from 'fs';
//import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("File downloads", async ({ page }) => { 
    //Created an event listener for download.
    let promisedDownloadEvent = page.waitForEvent("download");

    await page.goto("https://the-internet-5chk.onrender.com/download");
    
    await page.click("text='20261102_214316.jpg'"); //Triggers download event.

    let downloads = await promisedDownloadEvent;

    let downloadpath = path.join(__dirname,"/downloads", downloads.suggestedFilename());
   
    await downloads.saveAs(downloadpath);

    expect(fs.existsSync(downloadpath)).toBeTruthy();
  

});

test("File uploads", async ({ page }) => { 

    await page.goto("https://the-internet-5chk.onrender.com/upload");
    
    let filePath = path.join(__dirname, "./uploads", "TestUpload.txt");

    //await page.waitForTimeout(3000); 

    await page.setInputFiles("//input[@id='file-upload']", filePath);

    //await page.waitForTimeout(3000);

    page.click("//input[@id='file-submit']");//Upload button

    //await page.waitForTimeout(3000);

    await expect(page.getByText("File Uploaded!")).toBeVisible();
});
