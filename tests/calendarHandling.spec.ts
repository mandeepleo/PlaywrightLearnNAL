import { test, expect } from "@playwright/test";

test("calendar handling test", async ({ page }) => {
  await page.goto("https://seleniumpractise.blogspot.com/2016/08/how-to-handle-calendar-in-selenium.html");
  const datePicker = page.locator("#datepicker");
  await expect(datePicker).toBeVisible();

  await datePicker.click();
  let currentMonth = await page.locator("span.ui-datepicker-month").textContent();
  let currentYear = await page.locator("span.ui-datepicker-year").textContent();
  let currentCalendarDate = `${currentMonth?.trim()} ${currentYear?.trim()}`;
  console.log("Current Calendar: ", currentCalendarDate);
  const expectedCalendarDate = "August 2026";

  while (true) {

    if (currentCalendarDate === expectedCalendarDate) {
      // select date 21st
      await page.getByText("15", { exact: true }).click();
      break;
    } else {
      await page.waitForTimeout(500);
      await page.getByText("Next", { exact: true }).click();
    }
    // updating current displayed calendar date
    currentMonth = await page.locator("span.ui-datepicker-month").textContent();
    currentYear = await page.locator("span.ui-datepicker-year").textContent();
    currentCalendarDate = `${currentMonth?.trim()} ${currentYear?.trim()}`;
    console.log("Current displayed Calendar: ", currentCalendarDate);
  }
  
  await page.pause();
});
