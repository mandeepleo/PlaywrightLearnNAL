import { test, expect, Locator } from "@playwright/test";

test("New Tab Test", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://demoqa.com/browser-windows");
  await expect(page).toHaveTitle(/demosite/);
  const newPagePromise = context.waitForEvent("page"); // not using await keyword because
  // need to execute next statement as the waitForEvent method implicitly keep waiting for event to trigger
  // new tab event is triggered when button is clicked in the following statement
  await page.getByRole("button", { name: "New Tab" }).click();
  const newPage = await newPagePromise; // initialize newPage variable with the page object of the newly opened tab
  await expect(newPage).toHaveURL("https://demoqa.com/sample");
  const newPageHeading = newPage.getByRole("heading", {
    name: "This is a sample page",
  });
  await expect(newPageHeading).toBeVisible();
});
