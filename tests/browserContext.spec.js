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