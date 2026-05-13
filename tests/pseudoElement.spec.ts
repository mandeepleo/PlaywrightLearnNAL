import { expect, test } from "@playwright/test";
import assert from "assert";

test("pseudo element test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

  const pseudoElementValue = await page.evaluate(() => {
    // js code
    return window
      .getComputedStyle(document.querySelector("label[for='input-firstname']")!, "::before")
      .getPropertyValue("content");
  });
  console.log(pseudoElementValue); // printing content attribute value of pseudo element

  // verifying "content" of pseudo element
  const locator = page.locator("label[for='input-firstname']");
  await expect(locator).toHaveCSS("content", '\"* \"', { pseudo: "before" });
  
});
