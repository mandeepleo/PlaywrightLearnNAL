import { expect, Locator, test } from "@playwright/test";

test("locator chain test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
  await expect(page).toHaveTitle("Register Account");
  await page.locator("form").getByRole("textbox", { name: "First Name" }).fill("MANDEEP"); // locator chaining
  const inputValue = await page.locator("form").getByRole("textbox", { name: "First Name" }).inputValue();
  console.log("inputValue: ", inputValue); // logging input-value tp console
  await page.locator("form").getByRole("checkbox").click();
  await page.locator("#column-right").getByRole("link", { name: "Login" }).click();

  await page.pause();
});

test("locator chain in web tables test", async ({ page }) => {
  await page.goto("https://qavbox.github.io/demo/webtable/");
  await expect(page).toHaveTitle(/webtable/);
  await page
    .locator("#table01")
    .locator("tr")
    .filter({ hasText: "Performance" })
    .getByRole("button", { name: "Delete" })
    .click();
  await page.pause();
});

test("locator chain in web tables finding age of a person", async ({ page }) => {
  await page.goto("https://qavbox.github.io/demo/webtable/");
  await expect(page).toHaveTitle(/webtable/);
  const innerText: String = await page
    .locator("#table02")
    .locator("tr")
    .filter({ hasText: "Ashton Cox" })
    .locator("td")
    .nth(3)
    .innerText(); // fetching inertext (age number of Ashton Cox)
  console.log("Age of Ashton Cox is: ", innerText); // logging the fertched age data on the console

  await page.pause();
});

test("locator chain in web tables | finding all data in a row", async ({ page }) => {
  await page.goto("https://qavbox.github.io/demo/webtable/");
  await expect(page).toHaveTitle(/webtable/);
  const allData: String[] = await page
    .locator("#table02 tr") // css selector
    .filter({ hasText: "Ashton Cox" }) // playwright-provided method
    .locator("td") // css selector
    .allInnerTexts();
  // prinitng all data
  console.log("Total columns: ", allData, "\n");

  for (let e of allData) {
    console.log(e);
  }
});

test("locator chain in web tables | finding total no. of rows and columns", async ({ page }) => {
  await page.goto("https://qavbox.github.io/demo/webtable/");
  await expect(page).toHaveTitle(/webtable/);
  const colCount: number = await page.locator("#table02 th").count();
  console.log("Total columns: ", colCount);
  const rowCount: number = await page.locator("#table02 tr").count();
  console.log("Total rows: ", rowCount);
});

test("cricinfo", async ({ page }) => {
  await page.goto(
    "https://www.espncricinfo.com/series/ipl-2026-1510719/gujarat-titans-vs-punjab-kings-46th-match-1529289/full-scorecard",
  );
  await expect(page.getByRole("heading", { name: "GT vs PBKS, 46th Match at" })).toBeVisible({ timeout: 10000 });
  const bowler: String = await page
    .locator("table.ci-scorecard-table")
    .nth(0)
    .locator("tr")
    .filter({ hasText: "Cooper" })
    .locator("td")
    .nth(1)
    .innerText();
  console.log("Wicket taker catcher/bowler is: ", bowler);
});

test("cricinfo print score of a player test", async ({ page }) => {
  await page.goto(
    "https://www.espncricinfo.com/series/ipl-2026-1510719/gujarat-titans-vs-punjab-kings-46th-match-1529289/full-scorecard",
  );
  await expect(page.getByRole("heading", { name: "GT vs PBKS, 46th Match at" })).toBeVisible({ timeout: 10000 });
  let locator: Locator = page
    .locator("table.ci-scorecard-table")
    .nth(0)
    .locator("tr")
    .filter({ hasText: "Shreyas" }) // Mentioned Player Name here
    .locator("td");

  let locatorCount: number = await locator.count(); // counting total no. of locators (columns in the table)

  console.log("Printing mentioned player scorecard:\n");
  for (let i = 2; i < locatorCount - 1; i++) {
    console.log(await locator.nth(i).innerText());
  }
});

test("print entire table", async ({ page }) => {
  await page.goto("https://www.w3schools.com/html/html_tables.asp");
  await expect(page).toHaveTitle("HTML Tables");
  let allLocators: string[] = await page.locator("table").first().locator("tr").allInnerTexts();
  for (let e of allLocators) {
    console.log(e);
  }
});
