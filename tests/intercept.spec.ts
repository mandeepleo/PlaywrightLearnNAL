import { test } from "@playwright/test";

/** This test intercepts every network request made by the page and logs it */
test("@intercept", async ({ page }) => {
  page.route("**/*", async (route) => {   // "**/*" wild-card means intecept all type of network requests
    console.log(route.request().method(),route.request().resourceType(), route.request().url());
    await route.continue();
  });
  await page.goto("https://naveenautomationlabs.com/opencart/index.php");
});
