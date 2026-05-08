import { expect, test } from "@playwright/test";

test("Open Shadow DOM element Test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/shadow-dom.html");
  await expect(page).toHaveTitle("Shadow DOM Playground — Playwright Practice");

  await page.locator("#shadow-btn").click();
  await expect(page.locator("#shadow-output")).toHaveText(/Button clicked/);

  await page.locator("#username").fill("Aman");
  await page.locator("#email").fill("aman@imail.com");
  await page.locator("#bio").fill("this is aman's bio");
  await page.locator("#submit-btn").click();
  await expect(page.locator("#form-result")).toHaveText(/Submitted/);

  await page.pause();
});
