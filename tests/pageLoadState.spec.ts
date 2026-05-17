import { test, expect } from "@playwright/test";

test("page load state test", async ({ page }) => {
    // Loading States (waitUntil) Options:
    // 'domcontentloaded' - consider operation to be finished when the DOMContentLoaded event is fired.
    // 'load' - consider operation to be finished when the load event is fired. Default option.
    // 'networkidle' - DISCOURAGED consider operation to be finished when there are no network connections for at least 500 ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    // 'commit' - consider operation to be finished when network response is received and the document started loading.

    await page.goto("https://www.saucedemo.com/", { waitUntil: "load" }); // though load is default option and not required to be mentioned
    expect(await page.title()).toBe("Swag Labs");

    // Set (for current command-line session) and verify NODE_ENV (MacOS zsh):
    // export NODE_ENV=qa
    // echo $NODE_ENV
    // Run test using command:npx playwright test pageLoadState.spec.ts
    //
    // Or use below single command for set and run:
    // NODE_ENV=qa npx playwright test pageLoadState.spec.ts

    console.log("NODE_ENV is set as: ", process.env.NODE_ENV); // checking if NODE_ENV is set or not
    await page.getByPlaceholder("Username").fill(process.env.saucedemouser!);
    await page.getByPlaceholder("Password").fill(process.env.saucedemopwd!);

    await page.getByRole("button", { name: "Login" }).click();
    expect(page.getByText("Products", { exact: true })).toBeVisible();
});
