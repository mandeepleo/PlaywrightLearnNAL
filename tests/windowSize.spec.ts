import { test, expect } from "@playwright/test";

// viewport setting for all tests in this file
test.use({
  viewport: { width: 1300, height: 900 },
});

test("calendar handling test", async ({ page }) => {
  await page.goto("https://seleniumpractise.blogspot.com/2016/08/how-to-handle-calendar-in-selenium.html");
  // viewport setting specific to this test only; will override any other global viewport setting
  page.setViewportSize({ width: 1200, height: 800 });
  const datePicker = page.locator("#datepicker");
  await expect(datePicker).toBeVisible();

  await datePicker.click();

  await page.pause();
});
