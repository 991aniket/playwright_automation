import { expect, test } from '@playwright/test';

test('Page Playwright Test', async ({ page }) => {
    await page.goto("https://www.w3schools.com/");
    //get the title and assert 
    console.log(await page.title());
    await expect(page).toHaveTitle("W3Schools Online Web Tutorials")

}
);
