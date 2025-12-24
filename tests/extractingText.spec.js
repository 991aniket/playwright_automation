import { expect, test } from "@playwright/test";

test("Login - Incorrect Username should show error message", async ({ page }) => {
  console.log("🔄 Opening Login Page");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log("✏️ Entering incorrect username and valid password");
  await page.locator("#username").fill("rahulshettyacademy1");
  await page.locator("#password").fill("learning");

  console.log("👉 Clicking Sign In Button");
  await page.locator("#signInBtn").click();

  const errorText = await page.locator("[style*='block']").textContent();
  console.log("❗ Error Message Displayed:", errorText);

  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

test("Login - Empty Username should show validation message", async ({ page }) => {
  console.log("🔄 Opening Login Page");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log("✏️ Leaving username empty and entering password");
  await page.locator("#username").fill("");
  await page.locator("#password").fill("learning");

  console.log("👉 Clicking Sign In Button");
  await page.locator("#signInBtn").click();

  const errorText = await page.locator("[style*='block']").textContent();
  console.log("❗ Validation Message:", errorText);

  await expect(page.locator("[style*='block']")).toContainText("Empty");
});

test("Login - Empty Password should show validation message", async ({ page }) => {
  console.log("🔄 Opening Login Page");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log("✏️ Entering username and leaving password empty");
  await page.locator("#username").fill("rahulshettyacademy1");
  await page.locator("#password").fill("");

  console.log("👉 Clicking Sign In Button");
  await page.locator("#signInBtn").click();

  const errorText = await page.locator("[style*='block']").textContent();
  console.log("❗ Validation Message:", errorText);

  await expect(page.locator("[style*='block']")).toContainText("Empty");
});

test("Login - Both Username and Password Empty should show validation message", async ({ page }) => {
  console.log("🔄 Opening Login Page");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log("✏️ Leaving both username and password empty");
  await page.locator("#username").fill("");
  await page.locator("#password").fill("");

  console.log("👉 Clicking Sign In Button");
  await page.locator("#signInBtn").click();

  const errorText = await page.locator("[style*='block']").textContent();
  console.log("❗ Validation Message:", errorText);

  await expect(page.locator("[style*='block']")).toContainText("Empty");
});
