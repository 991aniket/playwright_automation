import { expect, test } from '@playwright/test';

test('UI → Validate W3Schools Homepage Title', async ({ page }) => {

    console.log("🌐 Navigating to W3Schools Website...");
    await page.goto("https://www.w3schools.com/");

    console.log("📄 Fetching Page Title...");
    const pageTitle = await page.title();     // playwright gets the title of current webpage
    console.log("✅ Page Title Retrieved:", pageTitle);

    // toHaveTitle assertion verifies if actual title matches expected title
    console.log("🔍 Verifying Page Title...");
    await expect(page).toHaveTitle("W3Schools Online Web Tutorials");

    console.log("🎉 Title Verification Successful!");
});
