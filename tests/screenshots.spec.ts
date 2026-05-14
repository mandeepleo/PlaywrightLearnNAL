// sdet-qa

import { test } from "@playwright/test";

test("screenshots demo test", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com", { waitUntil: "load" });
  // visible page area screenshot
  await page.screenshot({ path: "screenshots/VisibleHomepage" + Date.now() + ".png" });
  // full-page screenshot
  await page.screenshot({ path: "screenshots/FullHomepage" + Date.now() + ".png", fullPage: true });
  // locator / element screenshot
  await page.getByAltText("Tricentis Demo Web Shop").screenshot({ path: "screenshots/logo" + Date.now() + ".png" });

  await page.pause();
});
