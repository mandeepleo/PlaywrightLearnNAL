import { test, expect, Page, chromium, Browser } from "@playwright/test";

test("New Tab Test", async ({ context }) => {
  // const browser: Browser = await chromium.launch();
  // const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto("https://demoqa.com/browser-windows");
  await expect(page).toHaveTitle(/demosite/);
  const newPage = context.waitForEvent("page"); // not using await keyword because
  // need to execute next statement as the waitForEvent method implicitly keep waiting for event to trigger
  // new tab event is triggered when button is clicked in the following statement
  await page.getByRole("button", { name: "New Tab" }).click(); // generated page event
  const newTab = await newPage; // initialize newTab variable with the page object of the newly opened tab
  await expect(newTab).toHaveURL("https://demoqa.com/sample");
  await expect(newTab.getByRole("heading", { name: "This is a sample page" })).toBeVisible();
});
