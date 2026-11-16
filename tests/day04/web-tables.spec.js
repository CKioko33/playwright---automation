import { test, expect } from '@playwright/test';
test("Web Table Practice1 - Number of Rows, Columns, and Cells", async ({ page }) => { 

    await page.goto("https://the-internet-5chk.onrender.com/web-tables");

    let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

    //Extracting all the rows of the table and printing them in the console.
    let rows = await table.locator("tr").all();
    let columns = await table.locator("th").all();
    let cells = await table.locator("td").all();



    expect(rows.length).toBe(9); //Verify that there are exactly 9 rows in the table.
    expect(columns.length).toBe(13); //Verify that there are exactly 13 columns in the table.
    expect(cells.length).toBe(104); //Verify that there are exactly 104 cells in the table.

  for (let cell of cells){
    console.log(await cell.textContent()); //Print each cell's data in the console.
        
    console.log("--------------------------------------------------");
    }

});

test("Web Table Practice2 - Print data on each row", async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/web-tables");

    let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

    let rows = await table.locator("tr").all();

    //Create a nested loop that can print each cell's data of each row and exclude the first and last column of the table.  
    for (let row of rows) {
        let cells = await row.locator("td").all();
        for (let index = 1; index < cells.length - 1; index++) {
            console.log(await cells[index].textContent());
        }
        console.log("--------------------------------------------------");
    }   
 });

test("Web Table Practice 3- Checkboxes", async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/web-tables");

    let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

    let rows = await table.locator("tr").all();

    let checkboxes = await table.locator("(//input[@type='checkbox'])").all();
    for (let checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        //await page.waitForTimeout(1000);
    }
});


