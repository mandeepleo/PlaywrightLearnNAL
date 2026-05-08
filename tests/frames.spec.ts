import { test, expect, Frame } from "@playwright/test";

// using page.frame() method
test("frame test", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames");

  console.log(page.frames().length); // printing total no. of frames on the current webpage

  const frame = page.frame({ url: /frame_1.html/ });
  if (frame) {
    frame.locator("input[name='mytext1']").fill("Hello World");
  } else console.log("Frame not available.");

  await page.pause();
});

// using page.frameLocator() method | nested frames
test("nested frames using page.frameLocator test", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames");
  await page.frameLocator("frame[src='frame_3.html']").locator("input[name='mytext3']").fill("Mandeep");
  // interacting with radio-button in an iframe nested inside a frame
  await page
    .frameLocator("frame[src='frame_3.html']") // outer frame
    .frameLocator("body > center > iframe") // inner (nested) iframe
    .getByRole("radio", { name: "Hi, I am the UI.Vision IDE" }) // radio-button in the inner iframe
    .click();
  await page.pause();
});

test("name and url of all frames test", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames");
  let frames: Frame[] = page.frames();
  console.log("Total no. of frames is: ", frames.length);
  // printing names of all frames
  for (let fr of frames) {
    console.log(fr.name(), ":", fr.url()); // prints name (if available) and url of all frames on page
  }
});
