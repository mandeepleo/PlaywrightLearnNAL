import { Locator, test } from "@playwright/test";

test("svg graph element test", async ({ page }) => {
  test.setTimeout(60_000); // overriding the default 30 sec test timeout
  await page.goto("https://petdiseasealerts.org/forecast-map#/");
  await page.waitForTimeout(5_000); // waiting for svg graph elements (USA map) to load
  const iframe = page.frameLocator('iframe[id*="map-instance"]'); // id is dynamically generating on webpage so, *= means id contains the specified text
  const allRegions: Locator[] = await iframe.locator("g.region").all(); // css selector g attribute having class region. Dot represents class.
  console.log("Total no. of regions/states: ", allRegions.length);

  for (let region of allRegions) {
    // await region.hover();
    const box = await region.boundingBox();
    const centerX = box!.x + box!.width / 2;
    const centerY = box!.y + box!.height / 2;
    await page.mouse.move(centerX, centerY);  // hovering mouse to the center of the element
    await page.waitForTimeout(100);
    const state = await region.getAttribute("id");
    console.log("State name: ", state);
  }
});
