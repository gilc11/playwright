import {test, expect} from '@playwright/test';

test.only('Learning Selectors', async ({page}) => {
    // Go to the page
    await page.goto('http://127.0.0.1:5500/clickMe.html');

    // 1. Selecting by ID
    await page.locator('#clickbutton').click();

    // 2. Selecting by Class
    await page.locator('.button-style').click();

    // 3. Selecting by tag and class
    await page.locator('button.button-style').click();

    // 4. Selecting by attribute value
    await page.locator('[data-action="increment"]').click();

    // 5. Selecting by partial attribute value
    await page.locator('[role="button"]').click();

    // 6. Selecting by text content
    await page.locator('text=Click Me').click();

    // 7. Selecting by combine selectors for precision, class and text contains
    await page.locator('.button-style:has-text("Click")').click();

    // 8. Selecting by combine selectors for precision, class and text exact match
    await page.locator('.button-style:has-text("Click Me")').click({exact: true});

    // 9. Selecting by attribute and text combination
    await page.locator('[data-action="increment"]:has-text("Click Me")').click();

    // 10. Selecting by playwright locators https://playwright.dev/docs/locators
    // get by text
    await page.getByText('Click Me').click();

    // 11. get by role
    await page.getByRole('button', {name: /Click Me/i}).click();

    // assert the counter value
    await expect(page.locator('#counter')).toContainText('11');

    //await page.pause	();
});