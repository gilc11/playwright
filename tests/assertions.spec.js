import {test, expect} from '@playwright/test';

test.describe.only('Learn Assertions @assertions_group', () => {
    test('Verify web page behaviour @smoke', async ({page}) => {
        // Go to the page
        await page.goto('https://the-internet.herokuapp.com/');

        // 1. to have url
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/');

        // 2. to have title
        await expect(page).toHaveTitle('The Internet');

    })

    test.only('Continues with assertions part.1', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/');

        // 3. Assert visibility
        await expect(page.locator('h1')).toBeVisible();

        await page.pause();

        // 4. Assert element to have text
        await expect(page.locator('h2')).toHaveText('Available Examples');

        // 5. Assert contains text
        await expect(page.locator('body')).toContainText('Frames');

    })

    test.only('Continues with assertions part.2', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/');

        // 6. assert counter value
        await page.pause();
        await expect(page.locator('a')).toHaveCount(46);
        await page.pause();

        // 7. to be checked
        await page.goto('https://the-internet.herokuapp.com/checkboxes');

        await page.waitForTimeout(1000);
        await page.waitForLoadState('networkidle'); // Waits until there are no network requests for at least 500ms, ensuring the page has fully loaded.

        let checkbox = await page.getByRole('checkbox').nth(0) // Check the first checkbox
        await checkbox.waitFor(); // Wait for the checkbox to be visible

        await page.getByRole('checkbox').nth(0).check(); // Check the first checkbox
        await page.getByRole('checkbox').nth(1).uncheck(); // Uncheck the second checkbox

        await expect(page.getByRole('checkbox').nth(0)).toBeChecked(); // Assert the first checkbox is checked
        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked(); // Assert the second checkbox is unchecked

    })

    test.only('Continues with assertions part.3', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/login');

        // 8. have value
        await page.pause();

        await page.locator('#username').fill('tomsmith'); // Fill the username field
        await expect(page.locator('#username')).toHaveValue('tomsmith'); // Assert the username field has the value 'tomsmith'
        await page.pause();

        // 9. element is enabled
        await expect(page.locator('button[type="submit"]')).toBeEnabled(); // Assert the submit button is enabled
        //await expect(page.locator('button[type="submit"]')).toBeDisabled(); // Assert the submit button is disabled

        await page.pause();

        // 10. verify text stored in variable
        const headerText = await page.locator('h2').textContent(); // Get the text content of the header
        expect(headerText).toBe('Login Page'); // Assert the header text is 'Login Page'
        await page.pause();
        

    })

})