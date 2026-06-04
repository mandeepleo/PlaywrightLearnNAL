// sdet-qa

import { test } from "@playwright/test";

test("screenshots demo test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com", { waitUntil: "load" });

    // #1. VISIBLE PAGE area screenshot
    await page.screenshot({ path: "screenshots/VisibleHomepage_" + Date.now() + ".png" });

    // #2. FULL-PAGE screenshot
    await page.screenshot({ path: "screenshots/FullHomepage_" + Date.now() + ".png", fullPage: true });

    // #3. ELEMENT screenshot
    await page
        .getByAltText("Tricentis Demo Web Shop")
        .screenshot({ path: "screenshots/logoElement_" + Date.now() + ".png" });

    // #4. CLIP screenshot
    await page.screenshot({
        path: "screenshots/clipShot_" + Date.now() + ".png",
        clip: { x: 0, y: 0, width: 500, height: 300 },
        omitBackground: true,
    });

    // Attach SS to HTML Report
    const ss: Buffer = await page.screenshot({ clip: { x: 0, y: 0, width: 500, height: 300 } });
    await test.info().attach("home page", {
        body: ss,
        contentType: "image/png",
    });

    // Attach custom logs [this will add logs in the attachement section of the PLaywright HTML report]
    await test.info().attach("home-page-log", { body: "Sample logs for home page" });

});
