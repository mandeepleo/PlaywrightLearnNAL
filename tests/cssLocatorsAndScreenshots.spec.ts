/*
tag is optional; following are different ways to use css selectors (w/ & w/o tag):
- tag with id: tag#id or #id 
- tag with class: tag.class or .class
- tag w/ amy attribute: tag[attributeName=value] or attributeName=value]
- tag w/ class and attribute: tag.class[attribute=value] or .class[attribute=value]

page.locator(cssLocator);

*/

import { test, expect, Locator } from "@playwright/test";

test("css locator test", async ({ page }) => {
  /*
    TEST STEPS:
    1. Navigate to https://demowebshop.tricentis.com/
    2. Verify page title
    3. Locate search box
    4. Tpe "noebook" in the search box 
    5. Locate Search Button
    6. Click Search Button
    7. Verify search page heading
    8. Locate search box on search page
    9. Fill "fiction" in the search box
    10. Locate and click on the search button
    11. Verify rating is visible of the search result
    12. Capture search results screenshot
    13. Capture full-page screenshot

*/

  await page.goto("https://demowebshop.tricentis.com/", { timeout: 30_000 });
  await expect(page).toHaveTitle("Demo Web Shop");

  // CSS Selector (tag#id) Breakdown:
  // input: represents tag name of the element
  // #: represents that the next keyword is id attribute of the element
  // small-searchterms: represents the actual id value of the element
  const searchBox: Locator = page.locator("input#small-searchterms"); // tag#id
  await searchBox.fill("notebook");

  // CSS Selector (tag.class) Breakdown:
  // input: represents tag name of the element
  // .: represents that the next keyword is class attribute of the element
  // input.button-1.search-box-button: represents the actual class value of the element
  //  (any spaces in the class name is replaced by a dot (.))
  const searchBtn: Locator = page.locator("input.button-1.search-box-button"); // tag.class
  await searchBtn.click();
  const searchPageHeading: Locator = page.locator("h1:has-text('Search')");
  await expect(searchPageHeading).toBeVisible();

  // CSS Selector tag[attributeName=value] Breakdown:
  // input: represents tag name of the element
  // 'value' is the attribute name of the input element
  // notebook is the actual value of the 'value' attribute
  const searchBoxNew: Locator = page.locator("input[value=notebook]"); // tag[attributeName=value]
  await searchBoxNew.fill("fiction");
  await page.locator(`.button-1.search-button`).click();

  // CSS Selector tag.class[attribute=value] Breakdown:
  // div: represents tag name of the element
  // .: represents that the next keyword is class-name
  // product-rating-box: represents class name
  // title: represent attribute name
  // '672 review(s)': represents title attribute's value
  const searchResultRating: Locator = page.locator("div.product-rating-box[title='672 review(s)']"); // tag.class[attribute=value]

  await expect(searchResultRating).toBeVisible();

  // Taking search results screenshot
  const searchResults: Locator = page.locator("div[class=search-results]");
  await searchResults?.screenshot({ path: Date.now() + "SearchResultScreenshot.png" });

  // Taking full page Screenshot
  await page.screenshot({
    path: Date.now() + "FullPageScreenshot.png",
    fullPage: true,
  });

  //   await page.pause();
});
