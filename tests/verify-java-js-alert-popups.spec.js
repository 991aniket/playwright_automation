import { test, expect } from "@playwright/test";

test("Verify JavaScript Alert popup behavior", async ({ page }) => {

    // Step 1: Navigate to Rahul Shetty Academy Automation Practice page
    console.log("➡️  Opening Automation Practice page");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Step 2: Handle alert dialog and add assertion
    page.on('dialog', async dialog => {
        console.log(`⚠️  Alert message displayed: ${dialog.message()}`);

        // Assertion: Validate alert text
        expect(dialog.message()).toBe("Hello , share this practice page and share your knowledge");

        // Assertion: Validate dialog type
        expect(dialog.type()).toBe("alert");

        await dialog.accept();
        console.log("✅ Alert accepted");
    });

    // Step 3: Trigger alert popup
    console.log("🖱️  Clicking Alert button");
    await page.locator("#alertbtn").click();
});


test("Verify JavaScript Confirm popup behavior", async ({ page }) => {

    // Step 1: Navigate to Rahul Shetty Academy Automation Practice page
    console.log("➡️  Opening Automation Practice page");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Step 2: Handle confirm dialog and add assertion
    page.on('dialog', async dialog => {
        console.log(`⚠️  Confirm message displayed: ${dialog.message()}`);

        // Assertion: Validate confirm dialog text
        expect(dialog.message()).toBe("Hello , Are you sure you want to confirm?");

        // Assertion: Validate dialog type
        expect(dialog.type()).toBe("confirm");

        await dialog.dismiss();
        console.log("❌ Confirm dismissed");
    });

    // Step 3: Trigger confirm popup
    console.log("🖱️  Clicking Confirm button");
    await page.locator("#confirmbtn").click();
});

test("Verify mouse hover and click on Top option", async ({ page }) => {

    // Step 1: Open Automation Practice page
    console.log("➡️ Opening Automation Practice page");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Step 2: Hover on Mouse Hover button
    console.log("🖱️ Hovering on Mouse Hover button");
    await page.locator("#mousehover").hover();

    // Step 3: Click on Top option
    console.log("⬆️ Clicking on Top option");
    await page.locator(".mouse-hover-content a", { hasText: "Top" }).click();

    // Assertion: Verify page scrolled to top (URL contains #top)
    console.log("✅ Verifying page navigated to top");
    await expect(page).toHaveURL(/#top/);
});


test("Verify mouse hover and click on Reload option", async ({ page }) => {

    // Step 1: Open Automation Practice page
    console.log("➡️ Opening Automation Practice page");
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const initialUrl = page.url();

    // Step 2: Hover on Mouse Hover button
    console.log("🖱️ Hovering on Mouse Hover button");
    await page.locator("#mousehover").hover();

    // Step 3: Click on Reload option
    console.log("🔄 Clicking on Reload option");
    await page.locator(".mouse-hover-content a", { hasText: "Reload" }).click();

    // Assertion: Verify page reloaded successfully
    console.log("✅ Verifying page reload");
    await expect(page).toHaveURL(initialUrl);
});