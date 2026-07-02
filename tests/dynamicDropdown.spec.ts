import { expect, Locator, Page, test } from "@playwright/test";

/*
This test will navigate to amazon.in, type "apple" in the search box
and capture the auto-suggestion options in the search box
*/
test("auto-suggest dropdown", async ({ page }) => {
  await page.goto("https://www.amazon.in/");
  await page.waitForTimeout(2_000);

  const continueButton: Locator = page.locator("button[alt='Continue shopping']");
  const searchBox: Locator = page.locator("input[role='searchbox']");

  // Verifying either continueButton OR searchBox is visible on screen (using or() method)
  expect(continueButton.or(searchBox)).toBeVisible();

  // clicking on continue button that sometimes appear on amazon when automation scripts run
  if (await continueButton.isVisible()) {
    await continueButton.click();
  }

  // proceeding with the search
  await searchBox.pressSequentially("apple", { delay: 500 });
  const searchSuggestions: Locator[] = await page.locator("div[class='left-pane-results-container']>div").all();
  const count: number = searchSuggestions.length;
  console.log("Number of suggested options is: ", count);
  // Printing all search suggestions
  for (let e of searchSuggestions) {
    console.log(await e.innerText());
    /**
     * innerText returns only the visible text rendered on the screen (mimicking what a user sees and copies),
     *  while textContent returns the raw text of all elements, including hidden text,
     *  <script> tags, and <style> tags.
     */
  }
});

test("dynamic jquery dropdown", async ({ page }) => {
  await page.goto("https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/");
  expect(page.getByText("ComboTree jQuery Plugin Demos", { exact: true })).toBeVisible;
  await page.locator("#justAnInputBox").click();
  // await page.locator("span").filter({ hasText: "choice 1" }).first().click();
  // await page.locator("span").filter({ hasText: "choice 5" }).first().click();
  // await page.locator("span").filter({ hasText: "choice 2 2" }).first().click();
  selectMultipleOptions(page, ["choice 1", "choice 2 2", "choice 6"]); // invoking function
  await page.pause();
});

// created a separate function for selecting multiple items in dropdown
async function selectMultipleOptions(page: Page, choices: String[]) {
  for (let ch of choices) {
    await page
      .locator("span")
      .filter({ hasText: `${ch}` })
      .first()
      .click();
  }
}

test("dynamic jquery dropdown select-all", async ({ page }) => {
  await page.goto("https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/");
  expect(page.getByText("ComboTree jQuery Plugin Demos", { exact: true })).toBeVisible;
  await page.locator("#justAnInputBox").click();
  // await page.locator("span").filter({ hasText: "choice 1" }).first().click();
  const optionLocators: Locator[] = await page.locator("span").filter({ hasText: "choice" }).all();
  selectAllOptions(page, optionLocators); // invoking function to select all 15 options in the dropdown

  await page.pause();
});

async function selectAllOptions(page: Page, locators: Locator[]) {
  for (let i = 0; i < 15; i++) {
    await locators[i].click();
  }
}
