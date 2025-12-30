import { test, expect } from '@playwright/test';

test("📝 Validate Parent Input Text Using inputValue() after Child Tab Data Extraction", async ({ browser }) => {

  console.log("🚀 Launching Browser Context...");
  const browserContext = await browser.newContext();

  console.log("📄 Creating Parent Page...");
  const parentPage = await browserContext.newPage();

  const documentsRequestLink = parentPage.locator("[href*='documents-request']");

  console.log("🔗 Navigating to Login Page...");
  await parentPage.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log("👂 Listening for Child Tab & Triggering Click...");
  /**
   * ⭐ NOTES:
   * waitForEvent('page')
   * 👉 Keeps Playwright in LISTENING MODE
   * 👉 Detects when a NEW TAB / CHILD PAGE opens
   *
   * Promise.all()
   * 👉 Runs both actions in parallel:
   *    1️⃣ Start listening for new page
   *    2️⃣ Click to open new tab
   * 👉 Continues ONLY after BOTH complete
   */
  const [childPage] = await Promise.all([
    browserContext.waitForEvent("page"),
    documentsRequestLink.click()
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

  /**
   * ⭐ NOTES:
   * inputValue()
   * 👉 Returns the value currently typed in an INPUT field
   * 👉 Best for <input>, <textarea>
   *
   * textContent()
   * 👉 Used to extract TEXT visible on the webpage (DOM text)
   * 👉 Does NOT work correctly for input fields
   */
  console.log("🧐 Verifying text entered in Username field...");
  console.log("📨 Username Input Value:", await parentPage.locator("#username").inputValue());

  console.log("✅ Child Window Handling & Data Transfer Test Completed Successfully!");
});
