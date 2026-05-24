import { test, expect } from "@playwright/test";
import { error } from "console";

test("api monitoring health-check test", async ({ request }) => {
    while (true) {
        const startTime = Date.now();
        const response = await request.get("https://restful-booker.herokuapp.com/ping");
        const endTime = Date.now();
        const duration = endTime - startTime;
        if (duration > 1300) {
            throw new Error(" API is responding slow.\nExpected time: <= 1300ms\nActual time: " + duration + " ms");
        } else {
            console.log("Total response time: ", duration);
        }
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
    }
});
