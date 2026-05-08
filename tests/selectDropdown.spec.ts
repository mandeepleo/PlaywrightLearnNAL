import { expect, Locator, test } from "@playwright/test";

/*
Playwright provides options to select options of a dropdown with selectOption() method
Either we can directly pass visible-text option or value / label / index of the option html tag (under select tag)
*/

////// Single select /////////

test("single select dropdown test ", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/books");
  await expect(page.getByRole("heading", { name: "Books" })).toBeVisible();

  // selecting usinng direct visible text
  await page.locator("#products-orderby").selectOption("Name: A to Z"); // visible text

  await page.waitForTimeout(1_000);

  // selecting using VALUE attribute
  await page.locator("#products-orderby").selectOption({
    value: "https://demowebshop.tricentis.com/books?orderby=10",
  });
  await page.waitForTimeout(1_000);

  // selecting using LABEL
  await page.locator("#products-orderby").selectOption({ label: "Name: Z to A" });
  await page.waitForTimeout(1_000);

  // selecting using INDEX
  await page.locator("#products-orderby").selectOption({ index: 5 });
  await page.waitForTimeout(1_000);
});

test("Verify number of options in the dropdown", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/books");
  await expect(page.getByRole("heading", { name: "Books" })).toBeVisible();

  const dropdownOptions: Locator = page.locator("#products-orderby>option");

  // Printing all dropdown option texts and counting total options
  const dropdownOptionsValue: String[] = await dropdownOptions.allTextContents();
  let optionsCount: number = 0;
  for (let e of dropdownOptionsValue) {
    console.log(e);
    optionsCount++;
  }
  //   console.log(dropdownOptionsValue);

  console.log("Total dropdown options: ", optionsCount);
  await expect(dropdownOptions).toHaveCount(optionsCount); // assert total no. of options count in select dropdown
});

/////// Multi-Select //////////

test("multi-select dropdown test", async ({ page }) => {
  await page.goto("https://selenium08.blogspot.com/2019/11/dropdown.html");
  await expect(page.getByText("Multiple Choice Dropdown List", { exact: true })).toBeVisible();
  await page.getByRole("listbox").selectOption(["June", "Aug", "Nov"]); // selecting multiple options passed as an array of strings
  await page.pause();
});
