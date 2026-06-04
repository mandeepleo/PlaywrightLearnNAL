import {test} from "@playwright/test";

// Executes once before all the tests in this file
test.beforeAll(async()=>{
    console.log('Before All -- connect to the DB');
    
})

// Executes before each test()
test.beforeEach(async()=>{
    console.log('Before Each -- login to the app');
    
})

// Executes after each test()
test.afterEach(async()=>{
    console.log('After Each - Logout from the app');
    
})

// Executes once after all the test()
test.afterAll(async()=>{
    console.log('After All -- close DB connection');
    
})

test("get inventory test", async()=>{
    console.log('::: Executes get inventory test :::');
    
})
test("search product test", async()=>{
    console.log('::: Executes search product test :::');
    
})

