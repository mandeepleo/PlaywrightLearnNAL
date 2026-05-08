import { test, request } from "@playwright/test";

test("GET test method #1", async ({ request }) => {
  const response = await request.get("https://fakestoreapi.com/products/1");
  console.log(await response.status());
});

test("GET test method #2", async () => {
  const reqContext = request.newContext({
    baseURL: "https://fakestoreapi.com",
  });
  const response = (await reqContext).get("/products/1");
  console.log((await response).status());
});
