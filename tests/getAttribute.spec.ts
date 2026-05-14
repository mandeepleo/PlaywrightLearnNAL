import { test, expect } from "@playwright/test";

test("Get attribute value test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  // soft assertion to check the id attribute value of login button.
  // If this assertion fails, then also the test will continue to execute and print the attribute value of username input field in the console
  await expect.soft(page.getByRole("button", { name: "Login" })).toHaveAttribute("id", "login-button");
  await page.getByPlaceholder("Username").fill("standard_user");
  // <input class="input_error form_input" placeholder="Username" type="text" data-test="username"
  //  id="user-name" name="user-name" autocorrect="off" autocapitalize="none" value="standard_user">
  const attributeValue = await page
    .getByPlaceholder("Username") // locator element
    .getAttribute("name"); // mention the DOM element ATTRIBUTE whose value needs to be fetched

  console.log(attributeValue);
});
