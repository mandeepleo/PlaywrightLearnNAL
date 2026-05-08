import {
  test,
  expect,
  chromium,
  Browser,
  Page,
  firefox,
  webkit,
} from "@playwright/test";

// test("has title", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" }),
//   ).toBeVisible();
// });

test("practicetestautomation.com test", async ({ page }) => {
  await page.goto("https://practicetestautomation.com/");
  await expect(page).toHaveTitle(/Practice Test Automation/); // expect page title to contain a sub-string
  let pageTitle: string = await page.title(); // get page title
  console.log("Page title is: ", pageTitle);

  await page.getByRole("link", { name: "Practice", exact: true }).click(); // click on Practice link
  pageTitle = await page.title(); // get page title
  console.log("Page title is: ", pageTitle);
  await page.getByRole("link", { name: "Test Login Page" }).click(); // click on Test Login Page link
  await page.getByRole("textbox", { name: "Username" }).fill("student"); // fill username field
  await page.getByRole("textbox", { name: "Password" }).fill("Password123"); // fill password field
  await page.getByRole("button", { name: "Submit" }).click(); // click on submit button
  await expect(
    page.getByRole("heading", { name: "Logged In Successfully" }),
  ).toBeVisible(); // expect to see logged in successfully message
  pageTitle = await page.title(); // get page title
  console.log("Page title is: ", pageTitle);
  await page.getByRole("link", { name: "Log out" }).click(); // click on log out button
  await expect(page.getByRole("heading", { name: "Test login" })).toBeVisible(); // expect to see test login page heading
  pageTitle = await page.title(); // get page title
  console.log("Page title is: ", pageTitle);

});
