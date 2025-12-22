import { expect, test } from '@playwright/test';

test('Browser Context Playwright Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://leetcode.com/problemset/all/")
    await context.close(); // cleanup

    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto("https://www.hackerrank.com/dashboard")
    await context1.close(); // cleanup

}
);

test('Page Playwright Test', async ({ page }) => {
    await page.goto("https://www.w3schools.com/");
    //get the title and assert 
    console.log(await page.title());
    await expect(page).toHaveTitle("W3Schools Online Web Tutorials")

}
);


test.only('Instagram Test', async ({ page }) => {
    await page.goto("https://www.instagram.com/accounts/login/?hl=en");
    //get the title and assert 
    console.log(await page.title());
    await expect(page).toHaveTitle("Login • Instagram");
    await page.locator("[name='username']").fill('testing.automation.991@gmail.com');
    await page.locator("[name='password']").fill('testpass@123');
    await page.locator("//button//div[text()='Log in']").click();
    await expect(page).toHaveTitle("Instagram");
}
);


