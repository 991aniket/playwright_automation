import { expect, test } from "@playwright/test";

/**
 * ================================
 * Test 1 — Static Dropdown
 * ================================
 */
test("UI → Validate Static Dropdown Selection", async ({ page }) => {

  const staticDropdown = page.locator("select.form-control");

  console.log("🔄 Opening Login Page...");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log("⬇️ Selecting dropdown option: Consultant");
  // Static dropdown is also referred to as a "Select dropdown".
  // If .className is not unique, we can use tagName.className
  await staticDropdown.selectOption("Consultant");
  // In selectOption(), we must pass the value attribute from <option value="">
  console.log("✅ Dropdown selection completed successfully.");

});


/**
 * ================================
 * Test 2 — Radio Button Selection + Popup Validation
 * ================================
 */
test("UI → Select Radio Button and Validate Popup Message", async ({ page }) => {

  const radioButtons = page.locator(".checkmark");
  const popupOkayButton = page.locator("#okayBtn");
  const popupMessageText = page.locator(".modal-body p");

  console.log("🔄 Opening Login Page...");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log("🔘 Selecting second Radio Button...");
  await radioButtons.nth(1).click();

  // There are multiple radio buttons and we want to click a specific one.
  // So, nth(index) is used to target a particular element among multiple matches.
  console.log("📩 Reading popup text...");
  const popupMessage = await popupMessageText.textContent();
  console.log("📢 Popup Text →", popupMessage);

  console.log("🔍 Verifying popup content...");
  await expect(popupMessageText).toContainText(
    "You will be limited to only fewer functionalities of the app. Proceed?"
  );

  // We want to verify whether the selected radio button is actually checked.
  // toBeChecked() is an assertion. It first verifies selection state
  // and then returns pass / fail.
  // ❌ expect: Property 'nth' not found (wrong way)
  // await expect(radioButtons).nth(1).toBeChecked();
  // ✔️ Correct way → put nth() inside locator
  console.log("✔️ Validating Radio Button is checked...");
  await expect(radioButtons.nth(1)).toBeChecked();

  // Another way to validate selection without assertion:
  // isChecked() returns true / false.
  console.log("📌 isChecked() Result →", await radioButtons.nth(1).isChecked());

});


/**
 * ================================
 * Test 3 — Checkbox Selection & Unselection
 * ================================
 */
test("UI → Select & Unselect Checkbox Validation", async ({ page }) => {

  const termsCheckbox = page.locator("#terms");

  console.log("🔄 Opening Login Page...");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log("☑️ Checking the checkbox...");
  await termsCheckbox.click();

  console.log("✔️ Verifying checkbox is checked...");
  await expect(termsCheckbox).toBeChecked();

  console.log("🔄 Unchecking the checkbox...");
  await termsCheckbox.uncheck();
  // uncheck() → used to unselect a checkbox

  // To verify checkbox is unchecked:
  // There is no dedicated assertion like toBeUnChecked()
  // So we use isChecked() → returns boolean
  console.log("❌ Verifying checkbox is unchecked...");
  expect(await termsCheckbox.isChecked()).toBeFalsy();
  // toBeFalsy() validates boolean false condition

});


/**
 * ================================
 * Test 4 — Verify Blinking Text Attribute
 * ================================
 */
test.only("UI → Verify Blinking Text Attribute on Page", async ({ page }) => {

  const blinkingDocumentLink = page.locator("[href*='documents-request']");

  console.log("🔄 Opening Login Page...");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log("✨ Validating blinking text attribute...");
  // To verify blinking text UI behavior,
  // we check element attributes instead of animation.
  await expect(blinkingDocumentLink).toHaveAttribute("class", "blinkingText");

  console.log("✅ Blinking attribute verified.");

});


//  expect(await termsCheckbox.isChecked()).toBeFalsy();
// In the above case, we are performing an action (isChecked())
// inside the expect, so 'await' is required because isChecked()
// is an async action that returns a boolean.
// toBeFalsy() verifies the returned boolean value is false.

//  await expect(popupMessageText).toContainText("You will ");
// In this case, the action is handled by Playwright Expect API itself,
// so await is written before expect(), not inside it.
