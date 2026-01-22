import { test, expect } from "@playwright/test";

test("Validate date selection on GreenKart Offers calendar", async ({ browser }) => {

    console.log("🚀 Creating a fresh browser context...");
    const context = await browser.newContext();

    console.log("📄 Opening GreenKart main page...");
    const parentPage = await context.newPage();

    const blinkingOfferLink = parentPage.locator("[href='#/offers']");

    await parentPage.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    console.log("✅ GreenKart main page loaded");

    // Assertion: Offer link should be visible
    await expect(blinkingOfferLink).toBeVisible();
    console.log("🔗 Offer link is visible");

    console.log("👂 Listening for Offers tab and clicking the link...");
    const [offerChildPage] = await Promise.all([
        context.waitForEvent("page"),   // Start listening before click
        blinkingOfferLink.click()       // Action that opens new tab
    ]);

    console.log("🆕 Offers page opened in new tab");

    console.log("⏳ Waiting for Offers page to fully load...");
    await offerChildPage.waitForLoadState("networkidle");

    const pageTitle = await offerChildPage.title();
    console.log("🧾 GreenKart Offer Page Title:", pageTitle);

    // Assertion: Validate correct page opened
    await expect(pageTitle).toContain("GreenKart");
    console.log("✅ Correct Offers page confirmed");

    console.log("📅 Entering calendar date values...");

    await offerChildPage.locator("[class*='inputGroup__month']").fill("12");
    console.log("➡️  Month entered");

    await offerChildPage.locator("[class*='inputGroup__day']").fill("12");
    console.log("➡️  Day entered");

    await offerChildPage.locator("[class*='inputGroup__year']").fill("2012");
    console.log("➡️  Year entered");

    // Assertion: Validate entered date values
    await expect(offerChildPage.locator("[class*='inputGroup__month']")).toHaveValue("12");
    await expect(offerChildPage.locator("[class*='inputGroup__day']")).toHaveValue("12");
    await expect(offerChildPage.locator("[class*='inputGroup__year']")).toHaveValue("2012");

    console.log("✅ Calendar date selection validated successfully");
});
