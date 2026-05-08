import {test,expect} from "@playwright/test"

test("image locator test",async({page})=>{
    await page.goto("https://naveenautomationlabs.com/opencart/index.php");
    await expect(page).toHaveTitle(/Your Store/);
    // getByAltText() function is used to locate an image (elemet) by its alt text
    await page.getByAltText("naveenopencart").highlight();
    await page.waitForTimeout(3000);
    await page.getByAltText("naveenopencart").click();
    // verifying visibility of same image with getByRole() locator
    await expect(page.getByRole("img",{name:'naveenopencart'})).toBeVisible();  




})