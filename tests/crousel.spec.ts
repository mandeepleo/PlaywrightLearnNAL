import { test, expect } from "@playwright/test";

// click on the nextBtn until it is disabled

test("carousel test", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/ui/carousel.html");
    await expect(page).toHaveTitle(/Product Carousel/);
    const nextBtn = page.locator("#nextBtn");
    while (await nextBtn.isEnabled()) {
        await nextBtn.click();
        await page.waitForTimeout(1_000);
    }
});
