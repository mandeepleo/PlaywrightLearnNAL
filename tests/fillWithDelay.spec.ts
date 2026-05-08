import {test,expect} from "@playwright/test";

test("test fill with delay", async({page})=>{
    await page.goto("https://naveenautomationlabs.com/opencart/index.php");
    await expect(page).toHaveTitle(/Your Store/);
    await page.getByRole('link', { name: ' My Account' }).click();
    await page.getByRole("link",{name:"Register"}).click();
    await expect(page).toHaveTitle(/Register/);
    // entering text with delay between each key-press. Delay time is provided in milliseconds
    await page.getByRole("textbox",{name:"* First Name",exact:true}).pressSequentially("MANDEEP",{delay:500});
    await page.getByRole("textbox",{name:"* Last Name",exact:true}).pressSequentially("SINGH",{delay:500});
})