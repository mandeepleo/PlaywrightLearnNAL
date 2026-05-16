import { test, expect } from "@playwright/test";
import fs from "fs";

test("file download test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/download");
  expect(await page.title()).toMatch("The Internet");

  const [downloadPromise] = await Promise.all([
    page.waitForEvent("download"),
    await page.getByRole("link", { name: "some-file.txt" }).click(),
  ]);

  // making sure there's no download error during downloading process
  expect(await downloadPromise.failure()).toBeNull();

  console.log("Downloaded file-name: ", downloadPromise.suggestedFilename()); // prinitng filename of the downloaded file
  console.log("Download file path: ", await downloadPromise.path()); // print default download path
  // the default download's file name is a random GUID
  // use download.suggestedFilename() to get suggested file name.
  console.log("Downloaded url: ", downloadPromise.url()); // print file downloaded url

  // Save file with the suggested filename to your specified path
  const filePath = `./downloads/${downloadPromise.suggestedFilename()}`;
  await downloadPromise.saveAs(filePath);

  // verify file exisits in the saveAs file-path
  expect(fs.existsSync(filePath)).toBeTruthy();

  // verify file size > 0
  const fileSize = fs.statSync(filePath).size; // .size property of fs.statSync() method returns file size in bytes
  expect(fileSize).toBeGreaterThan(0);
  console.log("Downloaded file size (in bytes): ", fileSize);

  // reading contents of file (useful only for txt files)
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File contents:\n", data); // "data" contains file content as a string
  });
});
