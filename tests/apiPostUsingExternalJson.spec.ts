import { expect, test } from "@playwright/test";
import payloadData from "../test-data/api-data.json"; // importing req payload from external JSON file

test("POST with external JSON test", async ({ request }) => {
    const response = await request.post("https://restful-booker.herokuapp.com/booking", {
        headers: { "Content-Type": "application/json" },
        data: payloadData,
    });

    console.log(response.status(), response.statusText());
    const respJson = await response.json();

    // assering bookingid is not null in the response payload and then print
    expect(respJson.bookingid).not.toBeNull();
    console.log("Booking ID is: ", respJson.bookingid);

    // asserting firstname is not null in the response and then compare against payloadData
    expect(respJson.booking.firstname).not.toBeNull();
    console.log(respJson.booking.firstname);
    expect(respJson.booking.firstname).toBe(payloadData.firstname);
});
