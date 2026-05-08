import { Browser, chromium, expect, firefox, Page } from "@playwright/test";

//IIFE (immediately invoked function expression)
// this file is not having any test method
// this can be run without npx playwright test (use vscode test-runner extension)
// playwright.config.ts file is not applicable here

(async () => {
  let browser: Browser = await firefox.launch({
    headless: false,
  });
  // let browser: Browser = await chromium.launch({
  //   executablePath:
  //     "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  //   headless: false,
  // });

  const page: Page = await browser.newPage();
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/(testing|playwright)/gi); // matche all occurances of the words testing and playwright; ignoring case
  console.log("PAGE URL: ", page.url()); // print page url
  console.log("PAGE TITLE: ", await page.title()); // print page title
  browser.close();
})();
