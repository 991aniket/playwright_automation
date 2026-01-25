import { test, expect } from "@playwright/test";

test("Verify iframe handling and extract text from iframe", async ({ page }) => {

    // Step 1: Navigate to Rahul Shetty Academy Automation Practice page
    console.log("➡️  Opening Automation Practice page");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Step 2: Locate iframe
    console.log("🖼️  Locating iframe on the page");
    const frameChildPage = page.frameLocator("#courses-iframe");

    // Step 3: Click on Lifetime Access link inside iframe
    console.log("🖱️  Clicking Lifetime Access link inside iframe");
    await frameChildPage.locator("li a[href*='lifetime-access']:visible").click();

    // Step 4: Get heading text from iframe
    console.log("📄 Extracting heading text from iframe");
    const extractedText = await frameChildPage.locator(".text h2").textContent();

    // Assertion: Verify text is not null
    expect(
        extractedText,
        "Expected heading text to be present inside iframe"
    ).not.toBeNull();

    // Step 5: Split text and extract second word (same logic)
    const text = extractedText?.split(" ")[1];

    // Log extracted value
    console.log(`✅ Extracted text after split: ${text}`);
});
