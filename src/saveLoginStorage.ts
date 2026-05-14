// this storage state is utilized in the tests/orangeHrmDashboard.spec.ts file tests

import { Browser, chromium, expect, Page } from "@playwright/test";

// this IIFE is used to save the login session of the user by generating
// a storage state file named storageState.json which can be used in the tests to maintain the login session
// without having to login again and again for each test case.
// This is useful when we have multiple test cases that require the user to be logged in
// and we don't want to repeat the login steps for each test case.
(async () => {
  const browser: Browser = await chromium.launch({
    channel: "chrome",
    headless: false,
    slowMo: 700,
  });

  const page: Page = await browser.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { timeout: 30_000 });
  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible({
    timeout: 10000,
  });
  // saving the storage state to the file named storageState.json
  // this storage state is utilized in the tests/orangeHrmDashboard.spec.ts file tests
  await page.context().storageState({ path: "storageState.json" });
  await browser.close();
})();
