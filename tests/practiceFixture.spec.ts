import { test } from "../fixture/MyCustomFixture.ts";

test("my custom worker fixture test", async ({ myCustomWorkerFixture }) => {
  console.log(
    "Inside the test, myCustomWorkerFixture value:",
    myCustomWorkerFixture,
  );
  // You can add assertions here to verify the behavior of your custom worker fixture
});

test("my custom fixture test", async ({ myCustomFixture }) => {
  console.log("Inside the test, myCustomFixture value:", myCustomFixture);
  // You can add assertions here to verify the behavior of your custom fixture
  
});
