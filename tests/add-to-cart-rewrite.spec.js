import { test, expect } from '@playwright/test';

test('🛒 Add product to cart and verify complete checkout flow (E2E) (REWRITE)', async ({ page }) => {

    // 🔹 Login Page
    const loginToastTitle = page.locator('.toast-title');

    // 🔹 Product Listing Page
    const productCards = page.locator('.card-body');
    const addToCartToast = page.locator("[class*='toast-message']");

    // 🔹 Cart Page
    const cartItemCards = page.locator('.cartWrap');

    // 🔹 Checkout Page
    const orderSummarySection = page.locator('.item__details');
    const couponSuccessMessage = page.locator("p:has-text('Coupon Applied')");

    // 🔹 Country Selection
    const countrySuggestionList = page.locator("[class*='ta-results']");

    // 🔹 Order Confirmation
    const orderConfirmationMessage = page.locator('.hero-primary');
    const orderIdText = page.locator('.em-spacer-1 .ng-star-inserted');
    const orderHistoryButton = page.locator(".em-spacer-1 [routerlink*='myorders']");
    const orderSuccessMessage = page.locator("[class='tagline']").nth(0);

    // 🔹 Test Data
    const targetProductName = 'ADIDAS ORIGINAL';
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
    await page.getByPlaceholder("email@example.com").fill(userEmail);

    console.log('🔑 Entering password');
    await page.getByPlaceholder("enter your passsword").fill(userPassword);

    console.log('➡️ Clicking login button');
    await page.getByRole("button").filter({ name: "Login" }).click();

    await expect(
        loginToastTitle,
        '❌ Login success message not displayed'
    ).toHaveText(' Login Successfully ');

    console.log('✅ Login successful');

    // 📦 Wait for Product Listing
    console.log('⏳ Waiting for product list to load');
    await productCards.first().waitFor();

    selectedProductPrice = await productCards
        .filter({ hasText: targetProductName })
        .locator(".text-muted")
        .textContent();

    console.log(`💰 Product price: ${selectedProductPrice}`);

    await productCards
        .filter({ hasText: targetProductName })
        .getByRole("button", { name: " Add To Cart" })
        .click();

    const toastText = await addToCartToast.textContent();
    console.log(`📢 Add to cart toast: ${toastText}`);

    expect(
        toastText,
        '❌ Product not added to cart'
    ).toContain('Product Added To Cart');

    console.log('✅ Product successfully added to cart');

    // 🛒 Navigate to Cart
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

    await cartItemCards.first().waitFor();
    const cartItemCount = await cartItemCards.count();

    console.log(`🧾 Number of items in cart: ${cartItemCount}`);

    expect(
        cartItemCount,
        '❌ Cart is empty after adding product'
    ).toBeGreaterThan(0);

    await expect(cartItemCards.getByText(targetProductName)).toBeVisible();
    await expect(
        cartItemCards.filter({ hasText: targetProductName }).locator(" p").nth(1)
    ).toContainText(selectedProductPrice);

    await cartItemCards
        .filter({ hasText: targetProductName })
        .getByRole("button", { name: "Buy Now" })
        .click();

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

    await page.locator('.field').filter({ hasText: 'Credit Card Number' }).locator('input').fill(creditCardNumber);
    await page.locator(".field").filter({ hasText: "Expiry Date " }).locator("select").first().selectOption(expiryMonth);
    await page.locator(".field").filter({ hasText: "Expiry Date " }).locator("select").last().selectOption(expiryYear);
    await page.locator(".field").filter({ hasText: "CVV Code " }).locator("input").fill(cvvCode);
    await page.locator(".field").filter({ hasText: "Name on Card " }).locator("input").fill(cardHolderName);

    // 🎟️ Apply Coupon
    console.log('🎟️ Applying coupon');
    await page.locator(".field").filter({ hasText: "Apply Coupon " }).locator("input").fill(couponCode);
    await page.getByRole("button").filter({ hasText: "Apply Coupon" }).click();

    await expect(
        couponSuccessMessage,
        '❌ Coupon not applied successfully'
    ).toHaveText('* Coupon Applied');

    console.log('✅ Coupon applied successfully');

    // 👤 Logged-in User Validation
    await expect(
        page.locator("div .details__user").locator("label").filter({ hasText: userEmail }),
        '❌ Logged-in user email not visible'
    ).toBeVisible();

    console.log('👤 Logged-in user email verified');

    // 🌍 Country Selection
    console.log('🌍 Selecting country');
    await page.getByPlaceholder("Select Country").pressSequentially('Ind', { delay: 150 });

    await countrySuggestionList.waitFor();
    const countryOptionsCount = await countrySuggestionList.locator('button').count();

    for (let i = 0; i < countryOptionsCount; i++) {
        const countryText = await countrySuggestionList.locator('button').nth(i).textContent();
        if (countryText?.trim() === 'India') {
            await countrySuggestionList.getByRole('button').nth(i).click();
            console.log('✅ Country selected: India');
            break;
        }
    }

    // 📦 Place Order
    console.log('📦 Placing order');
    await page.locator("div .details__user").getByText("Place Order ").click();

    await expect(
        loginToastTitle,
        '❌ Order placed success toast not displayed'
    ).toHaveText(' Order Placed Successfully ');

    await expect(
        orderConfirmationMessage,
        '❌ Order confirmation message missing'
    ).toContainText(' Thankyou for the order. ');

    const orderNumber = (await orderIdText.textContent())?.replaceAll('|', '').trim();
    console.log(`🧾 Order ID: ${orderNumber}`);

    // 📜 Order History
    console.log('📜 Navigating to order history');
    await orderHistoryButton.click();
    await page.locator("h1:has-text('Your Orders')").waitFor();

    console.log('🔍 Verifying order in history');
    await expect(page.locator("tr").filter({ hasText: orderNumber })).toBeVisible();
    await expect(page.locator("tr").filter({ hasText: orderNumber }).locator("td").filter({ hasText: targetProductName })).toBeVisible();
    await expect(page.locator("tr").filter({ hasText: orderNumber }).locator("td").filter({ hasText: selectedProductPrice })).toBeVisible();

    await page.locator("tr").filter({ hasText: orderNumber })
        .locator("td").getByRole("button", { name: "View" }).click();

    // 🔹 Order Details Page
    await orderSuccessMessage.waitFor();
    console.log('✅ Order details page loaded');

    await expect(
        orderSuccessMessage,
        '❌ Order confirmation message incorrect'
    ).toHaveText("Thank you for Shopping With Us");

    await expect(
        page.locator("div").getByText(orderNumber),
        '❌ Order number not visible on order details page'
    ).toBeVisible();

    // 🔹 Verify Product Price on order details page matches selected product price
    await expect(
        page.locator("div .artwork-card-info").getByText(selectedProductPrice),
        '❌ Product price mismatch on order details page'
    ).toBeVisible();

    console.log('🏁 Test Completed Successfully 🎉');
});

//https://rahulshettyacademy.com/angularpractice/