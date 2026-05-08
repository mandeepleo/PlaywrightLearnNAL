// Execute tests/practiceFixture.spec.ts to use this file //

import { test as baseTest } from "@playwright/test";

type MyFixtures = {
  myCustomFixture: any;
};

type MyWorkerFixtures = {
  myCustomWorkerFixture: any;
};

export const test = baseTest.extend<MyFixtures, MyWorkerFixtures>({
  myCustomFixture: async ({}, use: any) => {
    // setup code for myCustomFixture
    const myCustomFixtureValue = "This is my custom fixture value"; // this value can be any object or primitive value that you want to use in your tests
    console.log("Before part of myCustomFixture");
    await use(myCustomFixtureValue);
    // teardown code for myCustomFixture
    console.log("After part of myCustomFixture");
  },

  myCustomWorkerFixture: [
    async ({}, use: any) => {
      // setup code for myCustomWorkerFixture
      const myCustomWorkerFixtureValue =
        "This is my custom worker fixture value"; // this value can be any object or primitive value that you want to use in your tests
      console.log("Before part of myCustomWorkerFixture");
      await use(myCustomWorkerFixtureValue);
      // teardown code for myCustomWorkerFixture
      console.log("After part of myCustomWorkerFixture");
    },
    { scope: "worker" },
  ],
});
