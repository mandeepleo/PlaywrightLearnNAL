import { test, expect } from "@playwright/test";

test("highlight element test", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
  );
  await expect(page).toHaveTitle(/Register Account/);
  // highlight method is used for debugging only
  await page.getByRole("textbox", { name: "* First Name", exact: true }).highlight();
  await page.pause();
});
