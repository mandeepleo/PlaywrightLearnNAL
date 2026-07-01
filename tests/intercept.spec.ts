import { expect, test } from "@playwright/test";

/** This test intercepts every network request made by the page and logs it */
test("@intercept", async ({ page }) => {
  await page.route("**/*", async (route) => {
    // "**/*" wild-card means intecept all type of network requests
    console.log(route.request().method(), route.request().resourceType(), route.request().url());
    await route.continue();
  });
  await page.goto("https://naveenautomationlabs.com/opencart/index.php");
});

/** Intercept with mocking */
test("@mock", async ({ page }) => {
  const fakeProducts = [
    { name: "Macbook Air", price: "₹140000" },
    { name: "iPhone 17", price: "₹89000" },
  ];

  await page.route("**/products.php", (route) => {
    // "**/products.php" means navigating base URL can be anything but the endpoint must be products.php
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(fakeProducts),
    });
  });

  // navigating to a URI having endpoint products.php
  await page.goto("https://mandeep.com/products.php");
  // asserting (fake) data
  await expect(page.getByText("Macbook Air")).toBeVisible();
  await expect(page.getByText("iPhone 17")).toBeVisible();
});