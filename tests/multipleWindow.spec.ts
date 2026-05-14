import { test, Page, expect } from "@playwright/test";

test("two window handle test", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://orangehrm.com/contact-sales");
  expect(await page.title()).toContain("Contact Sales");

  const [childWindowPage] = await Promise.all([
    context.waitForEvent("page"),
    await page.getByRole("link", { name: "About Us" }).click(),
  ]);
  await childWindowPage.waitForLoadState();

  console.log("Total no. of pages: ", context.pages().length);

  await childWindowPage.bringToFront(); // (optional step) setting focus on new page/tab
  console.log("Child window title is: ", await childWindowPage.title());
  expect(await childWindowPage.title()).toContain("Get to Know Us");
  await childWindowPage.close(); // closing child window

  await page.bringToFront(); // (optional step) setting focus back to 1st parent window
  console.log("Parent window title: ", await page.title());
  await page.close(); // closing parent window

  await page.pause();
});

test("multiple window handle test", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://orangehrm.com/contact-sales");
  expect(await page.title()).toContain("Contact Sales");
  const links = [
    page.getByRole("link", { name: "About Us" }),
    page.getByRole("link", { name: "Contact Us" }),
    page.getByRole("link", { name: "Press Releases" }),
    page.getByRole("link", { name: "Become a Partner" }),
  ];

  // open all 4 links (child windows) using for-of loop
  for (const link of links) {
    const [childWindow] = await Promise.all([context.waitForEvent("page"), await link.click()]);
    await childWindow.waitForLoadState();
  }

  const pages: Page[] = context.pages(); // collecting all open pages in the pages[] array
  console.log("Total pages: ", pages.length); // prints 5 (1 parent & 4 child windows)

  // Prining titile of all pages
  console.log(await pages[0].title()); // parent window
  console.log(await pages[1].title()); // 1st child
  console.log(await pages[2].title()); // 2nd child
  console.log(await pages[3].title()); // 3rd child
  console.log(await pages[4].title()); // 4th child
});
