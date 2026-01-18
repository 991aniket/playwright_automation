import { test, expect } from '@playwright/test';

test("🧪 ProtoCommerce Form Submission | getBy methods practice", async ({ page }) => {

    console.log("➡️ Navigating to ProtoCommerce application");
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    console.log("✍️ Filling Name field");
    await page.locator(".form-group > input[name='name']").fill("test123");

    console.log("✍️ Filling Email field");
    await page.locator("div .form-group")
        .locator("input[name='email']")
        .fill("test@123gmail.com");

    console.log("✍️ Filling Password field");
    await page.getByPlaceholder("Password").fill("pass@123");

    console.log("☑️ Selecting IceCream checkbox");
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await expect(
        page.getByLabel("Check me out if you Love IceCreams!"),
        "❌ IceCream checkbox should be checked but it is not"
    ).toBeChecked();

    console.log("🔽 Selecting Gender dropdown value");
    await page.getByLabel("Gender").selectOption("Male");

    console.log("🔘 Selecting Student radio button");
    await page.getByLabel("Student").click();

    await expect(
        page.getByLabel("Student"),
        "❌ Student radio button should be selected but it is not"
    ).toBeChecked();

    console.log("📅 Entering Date of Birth");
    await page.locator("input[type='date']").fill("2025-12-31");

    console.log("🚀 Submitting the form");
    await page.getByRole("button").filter({ hasText: "Submit" }).click();

    console.log("✅ Verifying success message");
    await expect(
        page.locator("[class*='alert alert-success']"),
        "❌ Success alert not displayed or text mismatch"
    ).toContainText("The Form has been submitted successfully!.");

    console.log("🎉 Test completed successfully");

});
