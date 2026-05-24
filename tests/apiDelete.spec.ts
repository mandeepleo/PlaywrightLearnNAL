import {test} from "@playwright/test";

test("DELETE API test", async({request})=>{
    // extracting auth token
    const authResponse = await request.post("https://restful-booker.herokuapp.com/auth", {
        headers: { "Content-Type": "application/json" },
        data: { username: "admin", password: "password123" },
    });
    const responseJson = await authResponse.json();
    const token = responseJson.token;
    console.log("Token extracted with POST request: ", token, " HTTP Status Code: ",authResponse.status());

    // create new booking and extracting bookingid
    const bookingPayload = {
        "firstname" : "Mandeep",
        "lastname" : "Singh",
        "totalprice" : 555,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2026-01-01",
            "checkout" : "2019-01-15"
        },
        "additionalneeds" : "Breakfast"
    }
    const newBookingResp = await request.post("https://restful-booker.herokuapp.com/booking",
        {
        headers:{"Content-Type":"application/json"},
        data:bookingPayload,
    });
    
   const newBookingJson = await newBookingResp.json();
   console.log(newBookingJson);
   const bookingId = newBookingJson.bookingid;
   console.log('New Booking Created with Booking ID: ',bookingId," HTTP code: ",newBookingResp.status(), newBookingResp.statusText());

   // DELETING booking

   const deleteResp = await request.delete("https://restful-booker.herokuapp.com/booking/"+bookingId,
    {headers:{"Content-Type": "application/json","Cookie":"token="+token}});

    console.log("\nDelete response: ",deleteResp.status(), deleteResp.statusText());

    // Verifying DELETION by making GET for the bookingid

    const deletedBookingResp = await request.get("https://restful-booker.herokuapp.com/booking/"+bookingId);
    console.log('\nGET call response for deleted bookingid: ', deletedBookingResp.status(), deletedBookingResp.statusText());
    
    
   

})