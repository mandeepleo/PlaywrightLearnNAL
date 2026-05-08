import { test, expect, Locator } from "@playwright/test";

test("Find total links on the page test", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
  );
  await expect(
    page.getByRole("heading", { name: "Register Account" }),
  ).toBeVisible();
  const allLinks: Locator[] = await page.locator("a[href]").all(); // fetching array of <a> element locators using all() method
  console.log("Total No. of Links is: ", allLinks.length);

  console.log("\nPrinting Link Text and the Link URL below for all links:\n");
  for (let e of allLinks) {
    let innerText: string = await e.innerText();
    let altAttributeValue: string | null = await e.getAttribute("href");
    console.log(innerText, " : ", altAttributeValue);
  }
});

test("Find total images on the page test", async ({ page }) => {
  await page.goto("https://flipkart.com");
  const allImg: Locator[] = await page.locator("img").all(); // fetching array of <img> element locators using all() method
  console.log("Total No. of img is: ", allImg.length);

  console.log("\nPrinting alt & src attribute value of all <img> tags:\n");
  for (let e of allImg) {
    let altAttributeValue: string | null = await e.getAttribute("alt");
    let srcAttributeValue: string | null = await e.getAttribute("src");
    console.log("Alt Text: ", altAttributeValue, " , Src: ", srcAttributeValue);
  }
});

test("Total Links Direct Way Test", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
  );
  await expect(
    page.getByRole("heading", { name: "Register Account" }),
  ).toBeVisible();
  const allLinksCount: number = await page.locator("a[href]").count(); // fetching count of all <a> on page
  console.log("Total <a> tags are: ", allLinksCount);
});

// This test will iterate through all matching dom elements (links) and click on a specific link
test("Iterate links and click with break Test", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
  );
  await expect(
    page.getByRole("heading", { name: "Register Account" }),
  ).toBeVisible();

  const allLinks: Locator[] = await page.locator("a.list-group-item").all(); // when given locator matches multiple dom elements, all() returns array of locators
  // Iterating through array of locators and clicking when the link inner-text "Forgotten Password" is found
  for (let e of allLinks) {
    let linkText: String = (await e.innerText()).trim();
    await e.highlight(); // highiliting the links being iterated for visibility in headed mode
    await page.waitForTimeout(1000); // just for slowing down the iteration through all links for visibility in headed mode
    console.log(linkText); // printing iterated link-text(s)
    if (linkText === "Forgotten Password") {
      await e.click();
      break;
    }
  }
  // verifying Forgot Password page is loaded
  await expect(
    page.getByRole("heading", { name: "Forgot Your Password?" }),
  ).toBeVisible();

  await page.pause();
});
