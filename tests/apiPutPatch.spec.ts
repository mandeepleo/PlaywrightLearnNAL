import {test,expect} from "@playwright/test";

test("PUT example", async({request})=>{

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
   console.log('New Booking Created with Booking ID: ',bookingId," HTTP code: ",newBookingResp.status());
   
   

    // Update booking using auth token
    const updateDataPayload = {
        "firstname" : "Mandeep",
        "lastname" : "Singh",
        "totalprice" : 555,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2026-01-01",
            "checkout" : "2019-01-16"
        },
        "additionalneeds" : "Wifi"
    }

    const putResponse=request.put("https://restful-booker.herokuapp.com/booking/"+bookingId,
        {headers:
        {"Content-Type":"application/json",
        "Accept":"application/json",
        "Cookie":"token="+token,}, // auth token used
        data:updateDataPayload},
    );
    console.log('\nBooking updated successfully. HTTP Status Code: ',(await putResponse).status());
    

    // GET updated booking

    const updatedBookingResp = await request.get("https://restful-booker.herokuapp.com/booking/"+bookingId);
    const updatedBookingRespJson = await updatedBookingResp.json()
    console.log("\nUpdated booking:\n",updatedBookingRespJson);
    

})