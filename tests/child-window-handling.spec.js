import { test, expect } from '@playwright/test';

test("UI → Child Window Handling & Data Transfer Test", async ({ browser }) => {

    console.log("🚀 Launching Browser Context...");
    const context = await browser.newContext();

    console.log("📄 Opening New Page...");
    const parentPage = await context.newPage();

    const documentsRequestLink = parentPage.locator("[href*='documents-request']");

    console.log("🔗 Navigating to Login Page...");
    await parentPage.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log("🧏‍♂️ Listening for Child Tab Event & Opening Link...");
    // waitForEvent('page') listens for new tab
    // Promise.all() ensures BOTH — listening + click happen together
    const [childPage] = await Promise.all([
        context.waitForEvent("page"),   // waits until a new page opens
        documentsRequestLink.click()     // action that triggers new tab
    ]);

    console.log("🆕 Child Tab Opened Successfully!");

    console.log("🔍 Extracting Text From Child Tab...");
    const infoText = await childPage.locator(".red").textContent();
    console.log("📢 Extracted Text:", infoText);

    console.log("✂️ Extracting Email from Text...");
    const extractedEmail = infoText.split("@")[1].split(" ")[0];
    console.log("📧 Final Extracted Email:", extractedEmail);

    console.log("✅ Test Execution Completed Successfully!");

});
