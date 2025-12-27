import { expect, test } from "@playwright/test";

/**
 * Test 1: Using `waitForLoadState('load')`
 */
test("Validate product names after login using 'load' state", async ({ page }) => {

    // Locators
    const emailInput = page.locator("#userEmail");
    const passwordInput = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const productNameElements = page.locator(".card-body b");

    console.log("🔄 Navigating to Login Page...");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    console.log("✔️ Entering valid credentials...");
    await emailInput.fill("testing.automation.991@gmail.com");
    await passwordInput.fill("Learning@123");

    console.log("👉 Clicking Login...");
    await loginButton.click();

    console.log("⏳ Waiting for page to finish loading (load state)...");
    await page.waitForLoadState("load");

    console.log("📥 Extracting product titles...");
    const productTitles = await productNameElements.allTextContents();

   
    console.log(productTitles);

   
});


/**
 * Test 2: Using `waitForLoadState('domcontentloaded')`
 */
test("Validate product names after login using 'domcontentloaded' state", async ({ page }) => {

    const emailInput = page.locator("#userEmail");
    const passwordInput = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const productNameElements = page.locator(".card-body b");

    console.log("🔄 Navigating to Login Page...");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    console.log("✔️ Entering valid credentials...");
    await emailInput.fill("testing.automation.991@gmail.com");
    await passwordInput.fill("Learning@123");

    console.log("👉 Clicking Login...");
    await loginButton.click();

    console.log("⏳ Waiting for DOM content to load completely...");
    await page.waitForLoadState("domcontentloaded");

    console.log("📥 Extracting product titles...");
    const productTitles = await productNameElements.allTextContents();

   
    console.log(productTitles);

   
});


/**
 * Test 3: Using `waitForLoadState('networkidle')`
 */
test("Validate product names after login using 'networkidle' state", async ({ page }) => {

    const emailInput = page.locator("#userEmail");
    const passwordInput = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const productNameElements = page.locator(".card-body b");

    console.log("🔄 Navigating to Login Page...");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    console.log("✔️ Entering valid credentials...");
    await emailInput.fill("testing.automation.991@gmail.com");
    await passwordInput.fill("Learning@123");

    console.log("👉 Clicking Login...");
    await loginButton.click();

    console.log("⏳ Waiting for network to be idle...");
    await page.waitForLoadState("networkidle");

    console.log("📥 Extracting product titles...");
    const productTitles = await productNameElements.allTextContents();

   
    console.log(productTitles);

   
});


/**
 * Test 4: Using first element wait `.first().waitFor()`
 */
test("Validate product names using .first().waitFor() method", async ({ page }) => {

    const emailInput = page.locator("#userEmail");
    const passwordInput = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const productNameElements = page.locator(".card-body b");

    console.log("🔄 Navigating to Login Page...");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    console.log("✔️ Entering valid credentials...");
    await emailInput.fill("testing.automation.991@gmail.com");
    await passwordInput.fill("Learning@123");

    console.log("👉 Clicking Login...");
    await loginButton.click();
    //   await page.waitForLoadState('load'); if this not wroks the use below method 
    console.log("⏳ Waiting specifically for product titles to appear...");
    await productNameElements.first().waitFor();

    console.log("📥 Extracting product titles...");
    const productTitles = await productNameElements.allTextContents();

    console.log(productTitles);

   
});
