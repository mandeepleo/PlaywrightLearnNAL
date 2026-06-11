import { test, expect } from "@playwright/test";

test("capture screenshot", async ({ page }) => {
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.screenshot({ path: "screenshots/freshLoginPage.png", fullPage: true });
    
    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill("HARNAZ");
    await page.screenshot({ path: "screenshots/modifiedLoginPage.png", fullPage: true });



});

test("compare screenshot",async({page})=>{
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await expect(page).toHaveScreenshot("screenshots/freshLoginPage.png");

    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill("HARNAZ");
    await expect(page).toHaveScreenshot("screenshots/modifiedLoginPage.png");

})
