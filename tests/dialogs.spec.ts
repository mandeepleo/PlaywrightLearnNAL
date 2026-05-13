import { test, expect } from "@playwright/test";

/*
 -> By default, dialogs are auto-dismissed by Playwright
 -> 3 types of dialogs: ALERT, CONFIRM and PROMPT
*/

test("ALERT dialog test", async ({ page }) => {
  await page.goto("https://demoqa.com/alerts");
  await expect(page).toHaveTitle("demosite");
  page.once("dialog", async (dialog) => {
    console.log("Dialog type is: ", dialog.type());
    expect(dialog.type()).toBe("alert");
    console.log("Dialog messgae is: ", dialog.message());
    expect(dialog.message()).toContain("You clicked a button"); // Asserting alert dialog message
    await dialog.accept();
  });
  await page.locator("#alertButton").click();
  await page.locator("#alertButton").click();
});

test("CONFIRM dialog test", async ({ page }) => {
  await page.goto("https://demoqa.com/alerts");
  await expect(page).toHaveTitle("demosite");

  page.on("dialog", (dialog) => {
    console.log("Dialog type is: ", dialog.type());
    expect(dialog.type()).toBe("confirm"); // Asserting confirm dialog type
    console.log("Dialog message is: ", dialog.message());
    expect(dialog.message()).toContain("Do you confirm action?"); // Asserting confirm dialog message
    dialog.accept(); // clicking OK on confirm alert
    // dialog.dismiss(); // clicking Cancel on confirm alert
  });
  await page.locator("#confirmButton").click(); // Clicking OK on the confirm alert
  const resultMessage: String = await page.locator("#confirmResult").innerText();
  console.log("Confirm alert result message on page: ", resultMessage);

  // Asserting confirm alert result label text on page when OK is clicked
  expect(resultMessage).toContain("You selected Ok");

  // Asserting confirm alert result label text on page when Cancel is clicked
  // expect(resultMessage).toContain("You selected Cancel"); // Asserting confirm alert result label text on page
});

test("PROMPT dialog test", async ({ page }) => {
  await page.goto("https://demoqa.com/alerts");
  await expect(page).toHaveTitle("demosite");
  page.on("dialog", (dialog) => {
    console.log("Dialog type is:", dialog.type());
    expect(dialog.type()).toBe("prompt"); // Asserting prompt dialog type
    console.log("Dialog message is: ", dialog.message());
    expect(dialog.message()).toContain("Please enter your name"); // Asserting prompt dialog message
    console.log("Default value in the textbox on prompt alert is: ", dialog.defaultValue());
    dialog.accept("Mandeep Singh"); // Entering data and accepting prompt dialog
  });
  await page.locator("#promtButton").click();
  const promptResult: String = await page.locator("#promptResult").innerText();
  expect(promptResult).toContain("Mandeep Singh"); // Assertin prompt alert result label text on page
});
