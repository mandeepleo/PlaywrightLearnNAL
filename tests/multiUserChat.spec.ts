import test, {
  Browser,
  BrowserContext,
  chromium,
  Page,
} from "@playwright/test";


// IMPORTANT: Run the multiuser-demo app in your localhost before executing this test
// Refer file at: /Users/mandeep/Developer/multiuser-demo/README.md

test("multi user chat test", async ({}) => {
  const browser: Browser = await chromium.launch({
    channel: "chrome",
    headless: false,
    slowMo: 1000,
  });
  const context1: BrowserContext = await browser.newContext();
  const context2: BrowserContext = await browser.newContext();
  const page1: Page = await context1.newPage();
  const page2: Page = await context2.newPage();

  await page1.goto("http://localhost:3000");
  await page2.goto("http://localhost:3000");

  await page1.getByTestId("username-input").fill("user1");
  await page1.getByTestId("join-btn").click();

  await page2.getByTestId("username-input").fill("user2");
  await page2.getByTestId("join-btn").click();

  await page1.getByTestId("message-input").fill("hello from user1");
  await page1.getByTestId("send-btn").click();
  await page1.getByTestId("leave-btn").click();

  await page2.getByTestId("message-input").fill("hello from user2");
  await page2.getByTestId("send-btn").click();
  await page2.getByTestId("leave-btn").click();
});
