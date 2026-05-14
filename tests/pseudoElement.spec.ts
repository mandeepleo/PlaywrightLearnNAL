import { expect, test } from "@playwright/test";
import assert from "assert";

test("pseudo element test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

  // page.evaluate() method helps executing js code
  // here 'content' attribute's vale of before:: pseudo element is evaluated
  const pseudoElementValue = await page.evaluate(() => {
    // js code
    return window
      .getComputedStyle(document.querySelector("label[for='input-firstname']")!, "::before")
      .getPropertyValue("content");
  });
  console.log(pseudoElementValue); // printing content attribute value of pseudo element

  // alternatively, same can be verified using pseudo option of toHaveCSS() method
  // asserting "content" and "color" style of ::before
  const locator = page.locator("label[for='input-firstname']");
  await expect(locator).toHaveCSS("content", '\"* \"', { pseudo: "before" })
  await expect(locator).toHaveCSS("color", 'rgb(255, 0, 0)', { pseudo: "before" })
  
});
