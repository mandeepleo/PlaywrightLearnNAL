// sdet-qa

import { test } from "@playwright/test";

test("screenshots demo test", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com", { waitUntil: "load" });

  // #1. VISIBLE PAGE area screenshot
  await page.screenshot({ path: "screenshots/VisibleHomepage" + Date.now() + ".png" });

  // #2. FULL-PAGE screenshot
  await page.screenshot({ path: "screenshots/FullHomepage" + Date.now() + ".png", fullPage: true });

  // #3. ELEMENT screenshot
  await page.getByAltText("Tricentis Demo Web Shop").screenshot({ path: "screenshots/logo" + Date.now() + ".png" });

  await page.pause();
});
