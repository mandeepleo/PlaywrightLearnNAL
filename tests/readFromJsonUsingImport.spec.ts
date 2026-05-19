import { test, expect } from "@playwright/test";
import loginData from "../test-data/saucedemo-login-data.json"; // read data from JSON file and convert JSON to Object (Deserialization) using import statement
console.log(typeof loginData); // object

/** this test will run for the number of times as per the json objects in the saucedemo-login-data.json file */

test.describe("Login data driven test", () => {
    for (const data of loginData) {
        const { username, password, validity } = data; // destructuring assignment - extract username, password and validity from data object
        test(`Login test for ${username} and ${password}`, async ({ page }) => {
            await page.goto("https://www.saucedemo.com/");
            // Fill login form
            await page.getByRole("textbox", { name: "Username" }).fill(username);
            await page.getByRole("textbox", { name: "Password" }).fill(password);
            await page.getByRole("button").click();
            if (validity === "valid") {
                // Assert Products label is visible - indicates successful login
                await expect(page.getByText("Products")).toBeVisible({});
            } else {
                // Assert login button still visible after failed login attempt
                await expect(page.locator("#login-button")).toBeVisible({});
                // Assert user is still on the login page
                await expect(page).toHaveURL("https://www.saucedemo.com/");
            }
        });
    }
});
