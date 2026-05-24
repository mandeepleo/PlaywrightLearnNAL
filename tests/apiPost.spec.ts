import { test, expect } from "@playwright/test";

test("POST API - fetch token", async ({ request }) => {
    const response = await request.post("https://restful-booker.herokuapp.com/auth", {
        headers: { "Content-Type": "application/json" },
        data: { username: "admin", password: "password123" },
    });
    const responseJson = await response.json();
    const token = responseJson.token;
    console.log("Token: ", token);

    expect(response.status()).toBe(200);
    expect(responseJson.token).not.toBeNull(); // asserting toke is not null
});

test("Create booking - POST", async({request})=>{
    const bookingPayload = {
        "firstname" : "Mandeep",
        "lastname" : "Singh",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
    }
    const response = await request.post("https://restful-booker.herokuapp.com/booking",{
        headers:{"Content-Type":"application/json"},
        data:bookingPayload,
    });

// console.log(response.status());
// console.log(await responseJson);

const responseJson = await response.json();

// assering bookingid is not null in the response payload and then print 
expect(responseJson.bookingid).not.toBeNull(); 
console.log('Booking ID is: ',responseJson.bookingid);

// asserting firstname is not null in the response and then verify against bookingPayload data
expect(responseJson.firstname).not.toBeNull(); 
expect(responseJson.booking.firstname).toBe(bookingPayload.firstname);






})