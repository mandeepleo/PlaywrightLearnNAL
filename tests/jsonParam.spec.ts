import { expect, test } from "@playwright/test";
import fs from "fs";

// reading data from JSON
const jsonPath = "test-data/login-data.json";
const loginData: any = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

test.describe("Login data driven test", () => {
  for (const data of loginData) {
    const { email, password, validity } = data;
    test(`Login test for ${email} and ${password}`, async ({ page }) => {
      await page.goto("https://demowebshop.tricentis.com/login");
      // Fill login form
      await page.locator("#Email").fill(email);
      await page.locator("#Password").fill(password);
      await page.locator("input[value='Log in']").click();
      if (validity === "valid") {
        // Assert logout link is visible - indicates successful login
        const logoutLink = page.locator("a[href='/logout']");
        await expect(logoutLink).toBeVisible({ timeout: 5000 });
      } else {
        // Assert error message is visible
        const errorMessage = page.locator(".validation-summary-errors");
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
        // Assert user is still on the login page
        await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
      }
    });
  }
});
