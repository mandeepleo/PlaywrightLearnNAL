import { expect, test } from "@playwright/test";

test("browser back, forward & refresh button test", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  console.log("On LOGIN page");

  await page.getByText("Forgot your password?").click();
  await expect(
    page.getByRole("heading", { name: "Reset Password" }),
  ).toBeVisible();
  console.log('On \"forgot password\" page');

  await page.goBack(); // BACK page
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  console.log("Clicked BACK button and navigated on LOGIN page");

  await page.goForward(); // FORWARD page
  await expect(
    page.getByRole("heading", { name: "Reset Password" }),
  ).toBeVisible();
  console.log(
    'Clicked FORWARD button and again navigated to \"forgot password\" page',
  );

  await page.reload(); // RELOAD/REFRESH current page
  await expect(
    page.getByRole("heading", { name: "Reset Password" }),
  ).toBeVisible();
  console.log(
    'Clicked REFRESH button and the \"forgot password\" page is loaded again.',
  );
});
