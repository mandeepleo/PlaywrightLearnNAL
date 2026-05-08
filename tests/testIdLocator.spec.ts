import {test,expect} from "@playwright/test"

test("test-id locator test", async({page})=>{
    await page.goto("https://app.hubspot.com/login");
    await page.getByTestId("email-input-field").fill('mandeep@gmail.com');
    await page.pause();

})