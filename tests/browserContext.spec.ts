import { chromium, test, Page } from "@playwright/test";

/** Creating multiple pages from context */
test("browser contexts test", async () => {
  const browser = await chromium.launch();
  const context = browser.newContext();
  const page1 = await (await context).newPage();
  const page2 = await (await context).newPage();
  console.log("Total number of pages: ", (await context).pages().length); // prints 2

  await page1.goto("https://www.amazon.in");
  await page2.goto("https://www.flipkart.com");
  

  
});
