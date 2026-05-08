import { expect, Locator, test } from "@playwright/test";

test("Find total links on the page test", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
  );
  await expect(
    page.getByRole("heading", { name: "Register Account" }),
  ).toBeVisible();

  const allLinksInnerText: string[] = await page
    .locator("//a[@href]")
    .allInnerTexts();
  console.log("Total No. of Links <a> is: ", allLinksInnerText.length);

  console.log("\nPrinting inner text of all links:");
  for (let e of allLinksInnerText) {
    console.log(e);
  }
});
