import { test, expect } from "@playwright/test";

test("frame test", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames");

  console.log(page.frames().length); // printing total no. of frames on the current webpage

  const frame = page.frame({ url: /frame_1.html/ });
  if (frame) {
    frame.locator("input[name='mytext1']").fill("Hello World");
  } else console.log("Frame not available.");

  await page.pause();
});
