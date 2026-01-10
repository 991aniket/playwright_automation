import { test, expect } from '@playwright/test';

test("🪟 Multiple Child Window Handling", async ({ browser }) => {

    console.log("🚀 Creating a fresh browser context...");
    const context = await browser.newContext();

    console.log("📄 Opening parent (main) page...");
    const parentPage = await context.newPage();

    console.log("🔗 Defining locators for child-window links...");
    const environmentLinkLocator = parentPage.locator("[href*='environment']");
    const faqLinkLocator = parentPage.locator("[href*='faq']");

    console.log("🌐 Navigating to HackerRank Dashboard...");
    await parentPage.goto("https://www.hackerrank.com/dashboard");

    // =========================================================
    // ENVIRONMENT PAGE – CHILD WINDOW HANDLING
    // =========================================================

    console.log("👂 Listening for Environment tab & clicking the link...");
    const [environmentChildPage] = await Promise.all([
        context.waitForEvent('page'),   // 👂 Start listening BEFORE the click
        environmentLinkLocator.click()  // 🖱️ Action that opens a new tab
    ]);

    console.log("⏳ Waiting for Environment page to fully load...");
    await environmentChildPage.waitForLoadState("networkidle");

    console.log("🧾 Environment Page Title:", await environmentChildPage.title());

    // =========================================================
    // FAQ PAGE – CHILD WINDOW HANDLING
    // =========================================================

    console.log("👂 Listening for FAQ tab & clicking the link...");
    const [faqChildPage] = await Promise.all([
        context.waitForEvent('page'),   // 👂 New listener for the next tab
        faqLinkLocator.click()          // 🖱️ Click that opens FAQ tab
    ]);

    console.log("⏳ Waiting for FAQ page to fully load...");
    await faqChildPage.waitForLoadState("networkidle");

    console.log("🧾 FAQ Page Title:", await faqChildPage.title());

});
