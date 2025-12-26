import { expect,test } from "@playwright/test";

test("Extracting all product names from Home Page", async ({ page }) => {

  const usernameField = page.locator("#username");
  const passwordField = page.locator("#password");
  const signInButton = page.locator("#signInBtn");
  const productTitles = page.locator(".card-body a");

  console.log("🔄 Opening Login Page...");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log("✔️ Logging in with valid credentials");
  await usernameField.fill("rahulshettyacademy");
  await passwordField.fill("learning");

  console.log("👉 Clicking Sign In Button...");
  await signInButton.click();

//   console.log("⏳ Waiting for products page to load...");
//   await page.waitForURL("**/angularpractice/shop");

//   console.log("📦 Verifying product titles visibility...");
//   await expect(productTitles.first()).toBeVisible();

  console.log("📥 Extracting all product titles...");
  const allElementsTitles = await productTitles.allTextContents();

  console.log(allElementsTitles);
    
});