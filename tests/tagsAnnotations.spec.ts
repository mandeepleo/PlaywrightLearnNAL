import { test, expect } from "@playwright/test";

// @sanity tag has been added in the following test along with the test name
// run command: npx playwright test tests/tags.spec.ts --grep @sanity
test("title test @sanity", async () => {
    console.log("Sanity test");
});

// @regression tag added
// run with command: npx playwright test tests/tags.spec.ts --grep @regression
test("regression test @regression", async () => {
    console.log("Regression test");
});
// @smoke tag added
// run with command: npx playwright test tests/tags.spec.ts --grep @smoke
test("regression test @smoke", async () => {
    console.log("Smoke test");
});

// for running all tests: npx playwright test tags.spec.ts --grep "@sanity|@regression|@smoke"
// for running everything except @regression: npx playwright test tags.spec.ts --grep-invert @regression

// Other way of providing tag in test
test("title test", { tag: "@home @sanity" }, async () => {
    console.log("Home/Sanity test");
});

//// ANNOTATIONS ///
// annotations are displayed in the Playwright html report
test(
    "annotation test @sanity",
    {
        annotation: [
            { type: "issue", description: "https://www.jiratest.com/123" },
            { type: "flaky", description: "this test failes 4/10 times" },
        ],
    },
    async () => {
        console.log("annotations test");
    },
);
