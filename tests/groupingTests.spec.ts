// sdet-qa

import { test } from "@playwright/test";

test.describe("group1", () => {
  // run using: npx playwright test groupingTests.spec.ts --grep group1
  test("first test @first", async () => {
    // run using: npx playwright test groupingTests.spec.ts --grep @first
    console.log("first test");
  });
  test("second test @second", async () => {
    console.log("second test");
  });
});

test.describe("group2", () => {
  test("third test @third", async () => {
    console.log("third test");
  });
  test("fourth test @fourth", async () => {
    console.log("fourth test");
  });
});
