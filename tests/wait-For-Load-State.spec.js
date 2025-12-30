import { expect, test } from "@playwright/test";
/**
 * 🧪 Test 1: Validate product titles after login using 'load' state
 */
test("🛒 Validate product titles after login using 'load' state", async ({ page }) => {

  // 🔍 Locators
  const emailField = page.locator("#userEmail");
  const passwordField = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
  const productTitleElements = page.locator(".card-body b");

  console.log("🔄 Navigating to Login Page...");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  console.log("✔️ Entering valid credentials...");
  await emailField.fill("testing.automation.991@gmail.com");
  await passwordField.fill("Learning@123");

  console.log("👉 Clicking Login button...");
  await loginBtn.click();

  console.log("⏳ Waiting for page to fully load (load state)...");
  await page.waitForLoadState("load");
  /**
   * NOTES 👇
   * waitForLoadState('load')
   * 👉 This waits until the **entire page is loaded**
   * 👉 Includes: DOM + CSS + Images + Sub-resources
   * 👉 Ensures page finished loading before proceeding
   * 👉 More reliable than 'domcontentloaded' when UI elements load late
   */

  console.log("📥 Extracting product titles...");
  const productTitles = await productTitleElements.allTextContents();

  console.log("📋 Product Titles Found:");
  console.log(productTitles);

});
/**
 * 🧪 Test: Validate product titles after login using 'domcontentloaded' state
 */
test("🛒 Validate product titles after login using 'domcontentloaded' state", async ({ page }) => {

  const emailField = page.locator("#userEmail");
  const passwordField = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
  const productTitleElements = page.locator(".card-body b");

  console.log("🔄 Navigating to Login Page...");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  console.log("✔️ Entering valid credentials...");
  await emailField.fill("testing.automation.991@gmail.com");
  await passwordField.fill("Learning@123");

  console.log("👉 Clicking Login button...");
  await loginBtn.click();

  console.log("⏳ Waiting for DOM content to load completely...");
  await page.waitForLoadState("domcontentloaded");
  /**
   * NOTES 👇
   * waitForLoadState('domcontentloaded')
   * 👉 This waits until the HTML document is fully parsed.
   * 👉 It ensures the DOM structure is ready.
   * 👉 But it does NOT guarantee all images, CSS, or API calls are finished.
   * 👉 Use when you only need page structure ready, not full network completion.
   */

  console.log("📥 Extracting product titles...");
  const productTitles = await productTitleElements.allTextContents();

  console.log("📋 Product Titles Found:");
  console.log(productTitles);

});


/**
 * Test: Validate product names after login using Network Idle wait strategy
 */
test("🛒 Validate product titles after login using 'networkidle' state", async ({ page }) => {

  const emailField = page.locator("#userEmail");
  const passwordField = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
  const productTitleElements = page.locator(".card-body b");

  console.log("🔄 Navigating to Login Page...");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  console.log("✔️ Entering valid credentials...");
  await emailField.fill("testing.automation.991@gmail.com");
  await passwordField.fill("Learning@123");

  console.log("👉 Clicking Login button...");
  await loginBtn.click();

  console.log("⏳ Waiting until network becomes idle...");
  await page.waitForLoadState("networkidle");
  // waitForLoadState("networkidle")
  // 👉 This waits until there are no ongoing network calls for a short period (around 5 seconds).
  // 👉 It ensures all API calls and page resources finish loading before proceeding.
  // 👉 This is NOT a hard wait, it smartly waits only until the page finishes loading.

  console.log("📥 Extracting product titles...");
  const productTitles = await productTitleElements.allTextContents();

  console.log("📋 Product Titles Found:");
  console.log(productTitles);

});



/**
 * Test 4: Using first element wait `.first().waitFor()`
 */
test("Validate product list visibility using .first().waitFor() in Playwright", async ({ page }) => {

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
    // Here we are using waitFor() to wait for the element to appear,
    // but since multiple matching elements exist, Playwright may not
    // know which one to wait for specifically.
    // Therefore, we should define a specific element position
    // using methods like first(), last(), or nth().

    console.log("📥 Extracting product titles...");
    const productTitles = await productNameElements.allTextContents();

    console.log(productTitles);


});
