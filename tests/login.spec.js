import { test, expect } from '@playwright/test';

test.only('This a login test', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('#username').click();
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').click();
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: /Login/i }).click();//i is to ignore case insensitive on the login button
  await expect(page.locator('#flash')).toContainText(/You logged into a secure area!/);
  await expect(page.locator('h4.subheader')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
    //await page.pause();
  await page.locator('a.button.secondary.radius:has-text("Logout")').click();
  await page.getByLabel('Username').click(); //txt field is better using getByRole
  await page.getByLabel('Username').fill('11');
  await expect(page.getByLabel('Username')).toHaveValue('11');
    //await page.pause();

});