import { test, expect } from "@playwright/test";
import fs from "fs";

test("PSPCL | Display and Download Latest Bill Test", async ({ page }) => {
    await page.goto("https://consumer.pspcl.in/wss/auth/login", { waitUntil: "load" });
    await expect(page.getByRole("heading", { name: "Login To My Account" })).toBeVisible();
    // login with valid credentials
    await page.getByPlaceholder("Enter Account Number").fill("6556821000"); // Gulmohar Temp A/C
    await page.getByPlaceholder("Enter Password").fill("#GulMohar007");
    // await page.getByPlaceholder("Enter Account Number").fill("0498091000"); // JCT A/C
    // await page.getByPlaceholder("Enter Password").fill("#Command512");
    await page.getByRole("button", { name: "Sign In" }).click();
    expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    // click on view bill link
    await page.getByRole("link", { name: "View Bill" }).click();
    await expect(page.getByRole("heading", { name: "View Bill" })).toBeVisible();
    // get the latest bill details
    const latestIssuedDate = await page.locator("tr.ng-star-inserted").locator("td").nth(1).textContent();
    const latestDueDate = await page.locator("tr.ng-star-inserted").locator("td").nth(2).textContent();
    const latestBillAmt: string | null = await page
        .locator("tr.ng-star-inserted")
        .locator("td")
        .nth(3)
        .textContent();

    console.log("Latest bill Issued Dste is: ", latestIssuedDate);
    console.log("Latest bill Due Date is: ", latestDueDate);
    console.log("Latest bill amount is: ", latestBillAmt);
    // click on download icon to download the latest bill PDF
    const downloadPromise = page.waitForEvent("download");
    await page.locator("i.fa-solid.fa-file-pdf.fa-lg").first().click();

    const download = await downloadPromise;

    const filePath = `./downloads/${download.suggestedFilename()}`;
    download.saveAs(filePath);
    await page.waitForTimeout(3_000);
    console.log("Latest bill PDF is downloaded/saved at: ", filePath);

    expect(fs.existsSync(filePath)).toBeTruthy();
});
