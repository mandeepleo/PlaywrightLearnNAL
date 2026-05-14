import { expect, test } from "@playwright/test";

test("single file upload test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");
  expect(await page.title()).toBe("File Upload Playground");

  await page.locator("#single-file").setInputFiles("README.md"); // provide file path in setInputFiles() method
  await page.pause();
});

test("multiple file upload and reset test", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");
  expect(await page.title()).toBe("File Upload Playground");
  // passing multiple file paths in array to upload multiple files
  await page
    .locator("#multi-file")
    .setInputFiles(["README.md", "/Users/mandeep/Documents/vscode-shortcuts.rtf", "storageState.json"]);
  await page.waitForTimeout(3_000);

  // reset upload files
  await page.locator("#multi-file").setInputFiles([]); // pass blank array for reset

  await page.pause();
});

test("file upload and reset without input html tag", async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");
  expect(await page.title()).toBe("File Upload Playground");

  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    await page.getByRole("button", { name: "Choose Files" }).click(),
  ]);
  await fileChooser.setFiles(["README.md", "/Users/mandeep/Documents/vscode-shortcuts.rtf"]);
  await page.waitForTimeout(3_000);

  await fileChooser.setFiles([]); // reset by passing blank array
  await page.pause();
});
