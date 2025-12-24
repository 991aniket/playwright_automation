import { expect, test } from '@playwright/test';

test.only('Instagram login Test', async ({ page }) => {
console.log('🚀 Starting Instagram Login Test');

console.log('➡️ Navigating to login page...');
await page.goto('https://www.instagram.com/accounts/login/?hl=en');

console.log('📝 Validating login page title...');
const title = await page.title();
console.log(`📄 Login page title: ${title}`);
await expect(page).toHaveTitle('Login • Instagram');

console.log('🔐 Filling username and password...');
console.log('👤 Filling username...');
await page.locator("[name='username']").fill('testing.automation.991@gmail.com');

console.log('🔑 Filling password...');
await page.locator("[name='password']").fill('testpass@123');

console.log('🖱️ Clicking Login button...');
await page.locator("//button//div[text()='Log in']").click();

console.log('🏠 Verifying Instagram home page title...');
await expect(page).toHaveTitle('Instagram');

console.log('🎉 Instagram login test completed successfully!');

  });





