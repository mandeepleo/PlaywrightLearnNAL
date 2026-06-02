import { test, expect, Locator } from "@playwright/test";

test("svg graph element test", async ({ page }) => {
    // test.setTimeout(80_000); // overriding default 30 sec test timeout
    await page.goto(
        "https://www.iciciprulife.com/insurance-guide/financial-planning-tools-calculators/power-compounding-calculator.html",
    );
    await expect(page).toHaveTitle("Compound Interest Calculator Online in India 2026");
    await page.waitForTimeout(3_000); // wait for svg graph elemtn to load
    const graphPoints: Locator[] = await page.locator(".highcharts-markers .highcharts-point").all();
    console.log("Total svg locators (count):", graphPoints.length); // count of total matching locators

    for (let g of graphPoints) {
        console.log(await g.textContent());
        const box = await g.boundingBox();
        const centerX = box!.x + box!.width / 2; // calculating x-axis center (centerX) of box
        const centerY = box!.y + box!.height / 2; // calculating y-axis center (centerY) of box
        await page.mouse.move(centerX, centerY); // hovering mouse to the center of the region (centerX, centerY)
        await page.waitForTimeout(300);
    }
});
