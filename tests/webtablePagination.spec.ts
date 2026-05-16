import { test, expect, Locator } from "@playwright/test";

test("webtable and pagination test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/webtable-pagination.html");
  await expect(page.getByRole("heading", { name: "⬡ DataGrid Playground" })).toBeVisible();

  // selcting all records of username=john_doe from all pages of the webtable

  while (true) {
    // capture all rows on current page
    const tableRows = await page.locator("#tableBody > tr").all();

    for (const row of tableRows) {
      const userName = await row.locator("td").nth(1).textContent();
      if (userName?.trim() === "jane_smith") {
        await page.waitForTimeout(500);
        await row.locator('input[type="checkbox"]').check();
      }
    }
    const nextButton = page.getByRole("button", { name: "›" });
    // stop the outer while loop if last page reached
    if (!(await nextButton.isEnabled())) {
      break;
    }
    // go to next page
    await page.waitForTimeout(500);
    await nextButton.click();
  }

  await page.pause();
});
