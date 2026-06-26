import { expect, test } from "@playwright/test";

test("Response Test @responseTest", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "only runs in chromium"); // test runs only in chromium
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
  await page.waitForResponse((response) => response.status() === 200);
});
