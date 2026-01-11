import { test, expect } from '@playwright/test';

test('🛒 Add product to cart and verify checkout flow', async ({ page }) => {

    // 🔹 Login Page Locators
    const emailInput = page.locator('#userEmail');
    const passwordInput = page.locator('#userPassword');
    const loginButton = page.locator('#login');
    const loginToastTitle = page.locator('.toast-title');

    // 🔹 Product Listing Page
    const productCards = page.locator('.card-body');
    const addToCartToast = page.locator("[class*='toast-message']");
    const cartNavigationButton = page.locator("[routerlink*='cart']");

    // 🔹 Cart Page
    const cartItemCards = page.locator('.cartWrap');
    const checkoutButton = page.locator("[type='button']");

    // 🔹 Checkout Page
    const orderSummarySection = page.locator('.item__details');
    const userEmailInput = page.locator("[class*='user__name '] input");

    // 🔹 Payment Section
    const creditCardNumberInput = page.locator('.field')
        .filter({ hasText: 'Credit Card Number' })
        .locator('input');

    const expiryDateDropdowns = page.locator('.field')
        .filter({ hasText: 'Expiry Date' })
        .locator('select');

    const cvvInput = page.locator('.field')
        .filter({ hasText: 'CVV Code' })
        .locator('input');

    const cardHolderNameInput = page.locator('.field')
        .filter({ hasText: 'Name on Card' })
        .locator('input');

    const couponInput = page.locator('.field')
        .filter({ hasText: 'Apply Coupon' })
        .locator('input[name="coupon"]');

    const applyCouponButton = page.locator("button[type='submit']");
    const couponSuccessMessage = page.locator("p:has-text('Coupon Applied')");

    // 🔹 Country Selection
    const countryInput = page.locator("[placeholder*='Country']");
    const countrySuggestionList = page.locator("[class*='ta-results']");

    // 🔹 Order Confirmation
    const orderConfirmationMessage = page.locator('.hero-primary');
    const orderIdText = page.locator('.em-spacer-1 .ng-star-inserted');
    const orderHistoryButton = page.locator(".em-spacer-1 [routerlink*='myorders']");
    const placeOrderButton = page.locator(".user__name [class*='action__submit']");

    //Order History 
    const ordersTableRows = page.locator("tbody tr");
    
    //

    // 🔹 Locators
const orderSuccessMessage = page.locator("[class='tagline']").nth(0);
const orderId = page.locator("[class='col-text -main']");
const deliveryAddressSection = page.locator(".address").nth(1);
const userEmailText = deliveryAddressSection.locator("[class='text']").nth(0);
const countryText = deliveryAddressSection.locator("[class='text']").nth(1);
const productTitle = page.locator(".artwork-card-info [class='title']");
const productPriceText = page.locator(".artwork-card-info [class='info']");

    // 🔹 Test Data
    const targetProductName = 'iphone 13 pro';
    const userEmail = 'testing.automation.991@gmail.com';
    const userPassword = 'Learning@123';
    const creditCardNumber = '4111 1111 1111 1111';
    const cvvCode = '121';
    const cardHolderName = 'Automation Testing Bank';
    const couponCode = 'rahulshettyacademy';
    const expiryMonth = '06';
    const expiryYear = '29';

    let selectedProductPrice = null;

    console.log('🚀 Test Started: Add Product → Checkout → Order Placement Flow');

    // 🌐 Navigate to Login Page
    console.log('🌐 Navigating to login page');
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    // 🔐 Perform Login
    console.log(`👤 Entering email: ${userEmail}`);
    await emailInput.fill(userEmail);

    console.log('🔑 Entering password');
    await passwordInput.fill(userPassword);

    console.log('➡️ Clicking login button');
    await loginButton.click();

    await expect(
        loginToastTitle,
        '❌ Login success message not displayed'
    ).toHaveText(' Login Successfully ');

    console.log('✅ Login successful');

    // 📦 Wait for Product Listing
    console.log('⏳ Waiting for product list to load');
    await productCards.first().waitFor();

    const totalProducts = await productCards.count();
    console.log(`📦 Total products displayed: ${totalProducts}`);

    // 🔍 Find Target Product
    for (let i = 0; i < totalProducts; i++) {
        const productCard = productCards.nth(i);
        const productName = await productCard.locator('b').textContent();

        if (productName === targetProductName) {
            selectedProductPrice = await productCard.locator('.text-muted').textContent();

            console.log(`🎯 Product found: ${productName}`);
            console.log(`💰 Product price: ${selectedProductPrice}`);

            console.log('🛒 Clicking "Add To Cart"');
            await productCard.locator('text= Add To Cart').click();

            const toastText = await addToCartToast.textContent();
            console.log(`📢 Toast message: ${toastText}`);

            expect(
                toastText,
                '❌ Product not added to cart'
            ).toContain('Product Added To Cart');

            console.log('✅ Product successfully added to cart');
            break;
        }
    }

    // 🛒 Navigate to Cart
    console.log('🛒 Navigating to cart page');
    await cartNavigationButton.click();

    await cartItemCards.first().waitFor();
    const cartItemCount = await cartItemCards.count();

    console.log(`🧾 Number of items in cart: ${cartItemCount}`);

    expect(
        cartItemCount,
        '❌ Cart is empty after adding product'
    ).toBeGreaterThan(0);

    // 🔎 Cart Validation & Checkout
    for (let i = 0; i < cartItemCount; i++) {
        const cartItem = cartItemCards.nth(i);
        const cartItemName = await cartItem.locator('h3').textContent();
        const stockStatus = await cartItem.locator('.stockStatus').textContent();

        if (cartItemName === targetProductName) {

            console.log(`📦 Validating cart item: ${cartItemName}`);
            console.log(`📊 Stock status: ${stockStatus}`);

            expect(
                stockStatus?.trim(),
                '❌ Product is not in stock'
            ).toBe('In Stock');

            await expect(
                cartItem.locator('p').nth(1),
                '❌ Price mismatch in cart'
            ).toContainText(selectedProductPrice);

            console.log('➡️ Proceeding to checkout');

            if (cartItemCount === 1) {
                console.log('🧾 Single product → Clicking product-level checkout');
                await checkoutButton.locator('text=checkout').click();
            } else {
                console.log('🧾 Multiple products → Clicking global checkout');
                await cartItem.locator('.btn.btn-primary').click();
            }

            break;
        }
    }

    // 🧾 Order Summary Validation
    console.log('🧾 Validating order summary');

    await expect(
        orderSummarySection.locator('.item__title'),
        '❌ Product name mismatch in order summary'
    ).toHaveText(targetProductName);

    await expect(
        orderSummarySection.locator('.item__price'),
        '❌ Product price mismatch in order summary'
    ).toContainText(selectedProductPrice);

    // 💳 Payment Details
    console.log('💳 Entering payment details');

    await creditCardNumberInput.fill(creditCardNumber);
    await expiryDateDropdowns.first().selectOption(expiryMonth);
    await expiryDateDropdowns.nth(1).selectOption(expiryYear);
    await cvvInput.fill(cvvCode);
    await cardHolderNameInput.fill(cardHolderName);

    console.log('🎟️ Applying coupon');
    await couponInput.fill(couponCode);
    await applyCouponButton.click();

    await expect(
        couponSuccessMessage,
        '❌ Coupon not applied successfully'
    ).toHaveText('* Coupon Applied');

    console.log('✅ Coupon applied successfully');

    // 👤 User Validation
    const displayedEmail = await userEmailInput.nth(0).inputValue();
    console.log(`👤 Logged-in user email: ${displayedEmail}`);

    expect(
        displayedEmail,
        '❌ Logged-in email mismatch'
    ).toBe(userEmail);

    // 🌍 Country Selection
    console.log('🌍 Selecting country');
    await countryInput.pressSequentially('Ind', { delay: 150 });

    await countrySuggestionList.waitFor();
    const countryOptionsCount = await countrySuggestionList.locator('button').count();

    for (let i = 0; i < countryOptionsCount; i++) {
        const countryText = await countrySuggestionList.locator('button').nth(i).textContent();
        if (countryText?.trim() === 'India') {
            await countrySuggestionList.locator('button').nth(i).click();
            console.log('✅ Country selected: India');
            break;
        }
    }

    // 📦 Place Order
    console.log('📦 Placing order');
    await placeOrderButton.click();

    await expect(
        loginToastTitle,
        '❌ Order success toast not displayed'
    ).toHaveText(' Order Placed Successfully ');

    await expect(
        orderConfirmationMessage,
        '❌ Order confirmation message missing'
    ).toContainText(' Thankyou for the order. ');

    const orderNumber = (await orderIdText.textContent())?.replaceAll('|', '').trim();
    console.log(`🧾 Order ID: ${orderNumber}`);

    console.log('📜 Navigating to order history');
    await orderHistoryButton.click();

 // 🔹 Wait for Orders page to be visible
await page.locator("h1:has-text('Your Orders')").waitFor();
console.log("✅ Orders page loaded");

// 🔹 Get total number of orders
const totalOrders = await ordersTableRows.count();
console.log(`📦 Total orders found: ${totalOrders}`);

// 🔹 Handle case when no orders are present
if (totalOrders === 0) {
    console.log("⚠️ No orders available in Orders table");
}

// 🔹 Loop through each order row
for (let i = 0; i < totalOrders; i++) {

    console.log(`🔍 Checking order row index: ${i}`);

    // 🔹 Fetch Order ID from current row
    const rowOrderId = await ordersTableRows
        .nth(i)
        .locator("th")
        .textContent();

    console.log(`🆔 Order ID found: ${rowOrderId}`);

    // 🔹 Match Order ID
    if (rowOrderId && orderNumber.includes(rowOrderId)) 
        {

        console.log(`✅ Matching Order ID found: ${rowOrderId}`);

        // 🔹 Validate product name
        await expect(
            ordersTableRows.nth(i).locator("td").nth(1),
            `❌ Product name mismatch for Order ID: ${rowOrderId}`
        ).toHaveText(targetProductName);

        console.log("✅ Product name validated");

        // 🔹 Validate product price
        await expect(
            ordersTableRows.nth(i).locator("td").nth(2),
            `❌ Product price mismatch for Order ID: ${rowOrderId}`
        ).toHaveText(selectedProductPrice);

        console.log("✅ Product price validated");

        // 🔹 Click View button
        console.log("👉 Clicking on View button");
        await ordersTableRows
            .nth(i)
            .locator("button:has-text('View')")
            .click();

        console.log("✅ Order Details successful validation");
        break;
    }
}

// 🔹 Step 1: Wait for Order Confirmation Page
await orderSuccessMessage.waitFor();
console.log("✅ Order details page loaded");

// 🔹 Step 2: Verify success message
await expect(
    orderSuccessMessage,
    "❌ Order confirmation message is incorrect or missing"
).toHaveText("Thank you for Shopping With Us");
console.log("✅ Order confirmation message verified");

// 🔹 Step 3: Verify Order Number
await expect(
    orderId,
    "❌ Order number not displayed or does not match"
).toHaveText(orderNumber);
console.log(`✅ Order number verified: ${orderNumber}`);

// 🔹 Step 4: Verify User Email in delivery address
await expect(
    userEmailText,
    "❌ User email not found in delivery address"
).toHaveText(userEmail);
console.log("✅ User email verified in address section");

// 🔹 Step 5: Verify Country
await expect(
    countryText,
    "❌ Country value is missing or incorrect"
).toContainText("India");
console.log("✅ Country verified as India");

// 🔹 Step 6: Verify Product Name
await expect(
    productTitle,
    "❌ Product name does not match on order details page"
).toHaveText(targetProductName);
console.log("✅ Product name verified");

// 🔹 Step 7: Verify Product Price
await expect(
    productPriceText,
    "❌ Product price does not match on order details page"
).toContainText(selectedProductPrice);
console.log("✅ Product price verified");

    console.log('🏁 Test Completed Successfully 🎉');
});
