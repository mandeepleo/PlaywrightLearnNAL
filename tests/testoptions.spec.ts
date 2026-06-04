import { test } from "@playwright/test";

test.skip("get inventory test", async () => {
    console.log("::: Executes get inventory test :::");
});
test("search product test", async () => {
    console.log("::: Executes search product test :::");
});

test.fixme("payment test", async () => {
    console.log("::: Executes payment test :::");
});

test.fail("add to cart test", async ({page}) => {
    console.log("::: Executes add to cart test :::");
    page.goto("sssd")
});

test("add to favorite test", async () => {
    console.log("::: Executes add to favorite test :::");
});


// Grouping tests 
test.describe("login TCs",()=>{
    test("login with valid credentials test", async () => {
    console.log("::: Executes login w/ valids creds :::");
});
test("login with invalid dredentials", async () => {
    console.log("::: Executes login w/ invalid creds :::");
});
})
