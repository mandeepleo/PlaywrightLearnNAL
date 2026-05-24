import { expect, test } from "@playwright/test";

test("GET API Test", async ({ request }) => {
    const response = await request.get("https://fakestoreapi.com/products/2");

    const resBodyJson = await response.json();
    // console.log(resBodyJson);

    const resHeaders = response.headers();
    // console.log(resHeaders);

    const resHeadersArr = response.headersArray();
    // console.log(resHeadersArr);

    const resStatus = response.status();
    // console.log(resStatus); // 200   

    const resStatusText = response.statusText();
    // console.log(resStatusText); // OK

    // assertions
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(response.ok).toBeTruthy();
    expect(resBodyJson).toHaveProperty("id", 2);
    expect(resBodyJson).toHaveProperty("title", "Mens Casual Premium Slim Fit T-Shirts ");
    expect(resBodyJson).toHaveProperty("price", 22.3);
    expect(resBodyJson.description).toContain("Slim-fitting style, contrast raglan long sleeve"); // "description" attribute's value to contain text
});
