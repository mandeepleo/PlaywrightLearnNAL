import {test,expect} from "@playwright/test";

test("placeholder test",async({page})=>{
    await page.goto("https://naveenautomationlabs.com/opencart/index.php");
    await expect(page).toHaveTitle(/Your Store/);
    await page.getByRole('link', { name: ' My Account' }).click();
    await page.getByRole("link",{name:"Register"}).click();
    await expect(page).toHaveTitle(/Register/);
    // using getByPlaceholder locator method
    await page.getByPlaceholder("First Name",{exact:true}).pressSequentially("Mandeep",{delay:500});
})
