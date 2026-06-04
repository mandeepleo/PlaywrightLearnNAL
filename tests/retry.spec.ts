import { test, expect } from "@playwright/test";

test.describe("login TCs", () => {
    test.describe.configure({ retries: 2 }); // configure retries at script level here
    test("login with valid credentials test", async () => {
        console.log("::: Executes login w/ valids creds :::");
        expect(2).toBe(1);
    });
    test("login with invalid dredentials", async () => {
        console.log("::: Executes login w/ invalid creds :::");
    });
});

// test("search product test", async ({}) => {
//     console.log("search product test");
//     expect(1).toBe(2);
// });
