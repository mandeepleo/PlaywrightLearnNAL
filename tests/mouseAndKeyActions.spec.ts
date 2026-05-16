import { test, expect } from "@playwright/test";

test("context-click test", async ({ page }) => {
  await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
  expect(await page.title()).toContain("contextMenu");

  await page.getByText("right click me", { exact: true }).click({ button: "right" }); // performing context-click
  // following dialog event handling is optional; Playwright automatically handles the dialogs

  // dialog event handler [optional]
  page.once("dialog", async (dialog) => {
    console.log('Dialog of type \"', dialog.type(), '\" is displayed.');
    console.log('Dialog message is: "', dialog.message(), '"');
    await dialog.dismiss();
  });
  await page.getByText("Copy", { exact: true }).click({ button: "left" }); // generates dialog event
});

test("Menu and sub-menu handling using hover method", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://www.spicejet.com/");
  expect(await page.title()).toContain("SpiceJet");

  await page.getByText("Travel Policies", { exact: true }).first().hover(); // sub-menu rolls open
  await page.getByText("Passenger Rights", { exact: true }).waitFor({ state: "visible" }); // wait for sub-menu to fully expand

  // handling new tab/window that opens when clicking on sub-menu option
  const [pagePromise] = await Promise.all([
    context.waitForEvent("page"),
    await page.getByText("Passenger Rights", { exact: true }).click(),
  ]);
  await pagePromise.waitForLoadState();
  await pagePromise.bringToFront();

  // assert new tab/window heading
  await expect(pagePromise.getByRole("heading", { name: "Passenger Rights" })).toBeVisible();
});

test("Multi-level menu handling using hover", async ({ page }) => {
  await page.goto("https://www.bigbasket.com/");
  expect(await page.title()).toContain("bigbasket");

  await page.locator('[id="headlessui-menu-button-:Rld956:"]').click();
  //   await mainMenuButton.click();
  //   await page.locator('a').filter({ hasText: 'Beverages' }).first().waitFor({state:"visible"});
  await page.locator('[id="headlessui-menu-items-:R15d956:"]').getByRole("link", { name: "Beverages" }).hover();
  await page.locator('[id="headlessui-menu-items-:R15d956:"]').getByRole("link", { name: "Tea" }).hover();
  await page.locator('[id="headlessui-menu-items-:R15d956:"]').getByRole("link", { name: "Green Tea" }).click();
  // Assert "Green Tea" label is visible on the search results page
  await expect(page.locator("h2").filter({ hasText: "Green Tea" }).first()).toBeVisible();
});

test("Drag and drop test", async ({ page }) => {
  await page.goto("https://jqueryui.com/resources/demos/droppable/default.html");
  await page.getByText("Drag me to my target", { exact: true }).dragTo(page.getByText("Drop here", { exact: true }));
  await page.pause();
});

test("Keyboard Enter keypress handling @keyboard", async ({ page }) => {
  await page.goto("https://playwright.dev/docs/intro");
  await page.getByRole("button", { name: "Search (Command+K)" }).click();
  await page.getByRole("searchbox", { name: "Search" }).pressSequentially("expect options", { delay: 200 });
  await page.getByRole("searchbox", { name: "Search" }).press("Enter"); // pressing enter key from keyboard
  // other way:
  // await page.keyboard.press("Enter"); // pressing enter key from keyboard
  expect(page.url()).toBe("https://playwright.dev/docs/test-configuration#expect-options");
});
