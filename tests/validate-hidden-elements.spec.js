import { test, expect } from "@playwright/test";

test("Verify browser navigation using back and forward actions", async ({ page }) => {

    // Step 1: Navigate to Rahul Shetty Academy
    console.log("➡️  Navigating to Rahul Shetty Academy practice page");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page).toHaveTitle(/Practice Page/i);

    // Step 2: Navigate to LeetCode
    console.log("➡️  Navigating to LeetCode website");
    await page.goto("https://leetcode.com/");

    await expect(page).toHaveTitle(/LeetCode/i);

    // Step 3: Navigate back
    console.log("⬅️  Navigating back to previous page");
    await page.goBack();

    // Assertion after going back
    const backTitle = await page.title();
    expect(backTitle).toContain("Practice Page");

    // Step 4: Navigate forward
    console.log("➡️  Navigating forward to next page");
    await page.goForward();

    // Assertion after going forward
    const forwardTitle = await page.title();
    expect(forwardTitle).toContain("LeetCode");
});

test.only("Verify visibility toggle of textbox using hide button", async ({ page }) => {

    // Step 1: Navigate to Rahul Shetty Academy practice page
    console.log("➡️  Opening Rahul Shetty Academy Automation Practice page");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Assertion: Validate page title
    await expect(page,"❌ Page title does not match expected 'Practice Page'").toHaveTitle(/Practice Page/i);

    const textBox = page.locator("#displayed-text");

    // Assertion: Textbox should be visible initially
    console.log("👁️  Verifying textbox is visible by default");
    await expect(textBox,"❌ Textbox should be visible on page load").toBeVisible();

    // Step 2: Hide the textbox
    console.log("🙈  Clicking on 'Hide' button to hide the textbox");
    await page.locator("#hide-textbox").click();

    // Assertion: Textbox should be hidden after clicking Hide
    console.log("✅  Verifying textbox is hidden after clicking Hide");
    await expect(textBox,"❌ Textbox is still visible after clicking the Hide button").toBeHidden();
});

