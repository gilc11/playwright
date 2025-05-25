import { test, expect } from '@playwright/test';
import { chromium } from 'playwright'; // Import chromium for manual browser control

// browser => context => page/tab
let browser, context, page;

test.beforeAll(async () => {
    // Launch chrome browser before all tests
    browser = await chromium.launch();
    console.log('BEFORE ALL HOOK LAUNCHED CHROMIUM BROWSER');
});

test.beforeEach(async () => {
    // Ensure the browser is initialized
    if (!browser) {
        throw new Error('Browser is not initialized. Check the beforeAll hook.');
    }

    // Create a context for the browser
    context = await browser.newContext();
    // Create a new page
    page = await context.newPage();
    // Navigate to the test URL
    await page.goto('https://the-internet.herokuapp.com/');
    console.log('BEFORE EACH LAUNCHED NEW PAGE');
    await page.pause(); // Pause execution for debugging
});

test.afterEach(async () => {
    // Close page and context
    if (context) {
        await context.close();
        console.log('AFTER EACH CLOSED CONTEXT');
    }
});

test.afterAll(async () => {
    // Close the browser if it exists
    if (browser) {
        await browser.close();
        console.log('AFTER ALL CLOSED BROWSER');
    }
});

test.only('A/B Testing', async () => {
    // Click on the A/B Testing link
    await page.click('text=A/B Testing');
    const header = await page.textContent('h3');
    expect(header).toBe('A/B Test Control');
});

test('Checkbox verification', async () => {
    // Click on the Checkbox link
    await page.click('text=Checkboxes');
    // Verify the first checkbox is unchecked
    const Checkbox = await page.isChecked('input[type="checkbox"]:first-child');
    expect(Checkbox).toBe(false);
});

test.only('Geolocation setting in context and verification', async () => {
    // set geolocation in context
    context = await browser.newContext({
        permissions: ['geolocation'], // Allow geolocation permission
        geolocation: { latitude: 37.774929, longitude: -122.419416 }, // Corrected coordinates
        viewport: { width: 1280, height: 720 } // Set viewport size
    });


    // Create a new page with the context
    page = await context.newPage();
    console.log('USING CONTEXT AND PAGE CREATED WITH TEXT AND NOT WITHIN HOOKS');
    await page.pause(); // Pause execution for debugging
    // Navigate to the test URL
    await page.goto('https://the-internet.herokuapp.com/geolocation');
    // Click on the "Get Current Position" button
    await page.click('button'); 
    // Wait for the geolocation to be set
    const lat = await page.textContent('#lat-value');
    const long = await page.textContent('#long-value');
    expect(parseFloat(lat)).toBeCloseTo(37.774929); // Check latitude
    expect(parseFloat(long)).toBeCloseTo(-122.419416); // Check longitude  

});