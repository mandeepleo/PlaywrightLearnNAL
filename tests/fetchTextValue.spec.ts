import { test, expect } from "@playwright/test";

test("fetch text value test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  await page.getByPlaceholder("Username").fill("standard_user");
  const enteredText: string = await page
    .getByPlaceholder("Username")
    .inputValue(); // inputValue method Returns the value for the matching <input> or <textarea> or <select> element
  console.log("Entered text is: ", enteredText);
});
