import { test, expect } from '@playwright/test';

test('Add product to cart and verify success message', async ({ page }) => {

    // 🔹 Locators
    const emailInput = page.locator('#userEmail');
    const passwordInput = page.locator('#userPassword');
    const loginButton = page.locator('#login');
    const productCards = page.locator('.card-body');
    const cartButton = page.locator("[routerlink*='cart']");
    const toastNotification = page.locator("[class*='toast-message']");

    // 🔹 Test Data
    const targetProductName = 'iphone 13 pro';
    let productPriceText;

    console.log('➡️ Navigating to login page');
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    console.log('➡️ Logging in with valid credentials');
    await emailInput.fill('testing.automation.991@gmail.com');
    await passwordInput.fill('Learning@123');
    await loginButton.click();

    console.log('⏳ Waiting for products to load');
    await productCards.first().waitFor();

    const productCount = await productCards.count();
    console.log(`📦 Total products displayed: ${productCount}`);

    // 🔍 Search product and add to cart
    for (let i = 0; i < productCount; i++) {

        const productName = await productCards.nth(i).locator('b').textContent();

        if (productName === targetProductName) {

            productPriceText = await productCards
                .nth(i)
                .locator('.text-muted')
                .textContent();

            console.log(`🎯 Product found: ${productName}`);
            console.log(`💰 Product price: ${productPriceText}`);

            await productCards
                .nth(i)
                .locator('text= Add To Cart')
                .click();

            const toastText = await toastNotification.textContent();
            console.log(`📢 Toast message: ${toastText}`);

            expect(toastText).toContain('Product Added To Cart');

            console.log('✅ Product successfully added to cart');
            break;
        }
    }

    console.log('🛒 Navigating to cart');
    await cartButton.click();
});
