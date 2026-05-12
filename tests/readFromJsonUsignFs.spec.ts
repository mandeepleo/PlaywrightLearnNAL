import { expect, test } from "@playwright/test";
import fs from "fs";
// for the above import statement to work, do the following:
// Install Node types: npm install -D @types/node
// Create tsconfig.json if not created earlier and add following code:
/**

  {
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",    
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "types": ["node"]
  }
}

 */

/** reading data from JSON file and converting JSON to Object (Deserialization) **/

// JSON file
//    ↓
// readFileSync(..., "utf-8")
//    ↓
// String
//    ↓
// JSON.parse()
//    ↓
// JavaScript Object

/*** Significance of writing 'utf-8': ***/
// Node.js returns a Buffer object (raw binary data), not a string.
// But JSON.parse() expects a JSON string, not a Buffer.
// So, with 'utf-8': Node.js reads the file, decodes bytes using UTF-8 encoding and returns a normal string
// to JSON.parse method

const loginData: any = JSON.parse(fs.readFileSync("test-data/login-data.json", "utf-8"));

test.describe("Login data driven test", () => {
  for (const data of loginData) {
    const { email, password, validity } = data;
    test(`Login test for ${email} and ${password}`, async ({ page }) => {
      await page.goto("https://demowebshop.tricentis.com/login");
      // Fill login form
      await page.locator("#Email").fill(email);
      await page.locator("#Password").fill(password);
      await page.waitForTimeout(2_000); // Wait for 2 seconds to simulate user pause
      await page.locator("input[value='Log in']").click();
      if (validity === "valid") {
        // Assert logout link is visible - indicates successful login
        const logoutLink = page.locator("a[href='/logout']");
        await expect(logoutLink).toBeVisible({ timeout: 5_000 });
      } else {
        // Assert error message is visible
        const errorMessage = page.locator(".validation-summary-errors");
        await expect(errorMessage).toBeVisible({ timeout: 5_000 });
        // Assert user is still on the login page
        await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
      }
    });
  }
});
