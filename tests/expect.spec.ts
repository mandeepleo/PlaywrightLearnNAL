import { test, expect } from "@playwright/test";

test("expect method test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/elementstate.html");
  expect(await page.title()).toBe("Register - Playwright Practice");

  // assert element color
  await expect(page.locator(".logo")).toHaveCSS("color", "rgb(22, 163, 74)");

  await expect(page.locator("#firstname")).toBeEmpty();
  await page.locator("#firstname").fill("Mandeep");
  await expect(page.locator("#firstname")).toHaveValue("Mandeep");

  await expect(page.locator("#register-btn")).toBeDisabled();

  await expect(page.locator("#email")).toBeEditable();

  await expect(page.locator("#username")).not.toBeEditable(); // assert non-editable using not

  await expect(page.getByRole("checkbox")).not.toBeChecked();
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("checkbox")).toBeChecked();
  await expect(page.locator("#register-btn")).toBeEnabled();

  await page.getByRole("checkbox").uncheck();
  await expect(page.locator("#register-btn")).toBeDisabled();
});
