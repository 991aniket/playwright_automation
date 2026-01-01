import { test, expect } from '@playwright/test';

test("🛒 Add To Cart – Validate Product Selection & Cart Addition Flow", async ({ page }) => {

    // 🔹 Locators
    const emailInputField = page.locator("#userEmail");
    const passwordInputField = page.locator("#userPassword");
    const loginButtonCTA = page.locator("#login");
    const productCardElements = page.locator(".card-body");

    // 🔹 Expected Product Details
    const expectedProductName = "iphone 13 pro";
    const expectedProductPrice = "$ 55000";

    console.log("🔄 Navigating to Login Page...");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    console.log("✔️ Entering valid credentials...");
    await emailInputField.fill("testing.automation.991@gmail.com");
    await passwordInputField.fill("Learning@123");

    console.log("👉 Clicking Login...");
    await loginButtonCTA.click();

    console.log("⏳ Waiting for product cards to load...");
    // wait until at least first product is visible
    await productCardElements.first().waitFor();

    console.log("📦 Fetching total available product cards...");
    const totalProducts = await productCardElements.count();
    console.log("🧮 Total Product Cards Found →", totalProducts);

    // 🔍 Loop through product list
    for (let index = 0; index < totalProducts; index++) {

        // Fetch name of each product
        const currentProductName = await productCardElements.nth(index).locator("b").textContent();

        // Match product
        if (currentProductName === expectedProductName) {
            
            console.log(`🎯 Match Found → ${currentProductName}`);
            console.log("🛍️  Adding product to cart...");

            // Click Add To Cart for matched product
            await productCardElements.nth(index).locator("text= Add To Cart").click();

            console.log("✅ Product Successfully Added To Cart:", currentProductName);

            // Once product is found no need to continue loop
            break;
        }
    }
});

/**
 🔥 NOTES
 ------------------------------------
 ✅ We used `.first().waitFor()` to ensure product cards are loaded
 ✅ `.count()` → gives total number of product cards
 ✅ Loop is used to compare each product name
 ✅ Once target product found → click Add To Cart → break loop
*/
