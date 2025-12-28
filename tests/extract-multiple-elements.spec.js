import { test, expect } from "@playwright/test";

test("Login – Re‑enter valid username & password after failure", async ({ page }) => {

    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const signInButton = page.locator("#signInBtn");
    const errorMessage = page.locator("[style*='block']");

    console.log("🔄 Opening Login Page");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log("❌ Entering invalid credentials");
    await usernameField.fill("learning");
    await passwordField.fill("rahulshettyacademy1");

    console.log("👉 Clicking Sign In Button");
    await signInButton.click();

    console.log("📢 Validating error message");
    await expect(errorMessage).toContainText("Incorrect");

    console.log("🧹 Clearing username and entering valid value");
    await usernameField.fill("rahulshettyacademy");

    console.log("🧹 Clearing password and entering valid value");
    await passwordField.fill("learning");

    console.log("👉 Clicking Sign In Button");
    await signInButton.click();

    await page.waitForTimeout(3000);
});


test("Extracting multiple product names from Home Page", async ({ page }) => {

    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const signInButton = page.locator("#signInBtn");
    const productTitles = page.locator(".card-body a");

    console.log("🔄 Opening Login Page");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log("✔️ Logging in with valid credentials");
    await usernameField.fill("rahulshettyacademy");
    await passwordField.fill("learning");

    console.log("👉 Clicking Sign In Button");
    await signInButton.click();

    console.log("📦 Fetching product titles…");

    console.log("📌 Fetching product using nth(1) — Second Product:");
    console.log(await productTitles.nth(1).textContent());

    console.log("📌 Fetching product using first() — First Product:");
    console.log(await productTitles.first().textContent());

    console.log("📌 Fetching product using last() — Last Product:");
    console.log(await productTitles.last().textContent());

});
