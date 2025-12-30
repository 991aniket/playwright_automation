import { test, expect } from '@playwright/test';

test("🪟 Child Window Handling → Extract Data & Use in Parent Page", async ({ browser }) => {

    console.log("🚀 Launching Browser Context...");
    const browserContext = await browser.newContext();

    console.log("📄 Creating Parent Page...");
    const parentPage = await browserContext.newPage();

    const documentsRequestLink = parentPage.locator("[href*='documents-request']");

    console.log("🔗 Navigating to Login Page...");
    await parentPage.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log("👂 Listening for Child Tab & Triggering Click...");
    /**
     * NOTES 👇
     * context.waitForEvent('page')
     * 👉 This keeps Playwright in listening mode
     * 👉 It waits until a NEW TAB / CHILD WINDOW opens
     *
     * Promise.all()
     * 👉 Ensures BOTH actions run together
     *    1️⃣ Listening for the event
     *    2️⃣ Clicking the link that opens new page
     * 👉 Execution continues ONLY when BOTH are completed
     */
    const [childPage] = await Promise.all([
        browserContext.waitForEvent("page"),   // waits for new page/tab
        documentsRequestLink.click()           // action that opens new tab
    ]);

    console.log("🆕 Child Tab Successfully Opened!");

    console.log("🔍 Extracting Information from Child Tab...");
    const infoText = await childPage.locator(".red").textContent();
    console.log("📢 Retrieved Text:", infoText);

    console.log("✂️ Extracting Email from the text...");
    const extractedEmail = infoText.split("@")[1].split(" ")[0];
    console.log("📧 Extracted Email:", extractedEmail);

    console.log("⌨️ Entering Extracted Email in Parent Page Username Field...");
    await parentPage.locator("#username").fill(extractedEmail);

    console.log("✅ Child Window Handling & Data Transfer Test Completed Successfully!");

});
