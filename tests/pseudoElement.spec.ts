import { test } from "@playwright/test";

test("pseudo element test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

  const pseudoElementValue = await page.evaluate(() => {
    // js code
    return window
      .getComputedStyle(document.querySelector("label[for='input-firstname']")!, "::before")
    //   .getPropertyValue("color");
      .getPropertyValue("content");
    //   .getPropertyValue("font-weight");
  });
  console.log(pseudoElementValue); // printing content attribute value of pseudo element
});
