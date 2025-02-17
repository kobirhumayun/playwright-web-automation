const { chromium } = require('playwright');
const path = require('path');

async function downloadPrcReport(url, fileName, fileType, downloadPath) {
    const browser = await chromium.launch({ headless: true }); // Set headless to false for visible browser
    const context = await browser.newContext();
    const page = await context.newPage();
    // await page.pause();

    try {

        const startTime = new Date().getTime();

        await page.goto(url);
        await page.getByRole('textbox', { name: 'Select LC Date' }).click();
        await page.getByRole('option', { name: 'Last Year' }).click();
        await page.locator('.dxrd-right-tabs').click();
        await page.locator('div:nth-child(2) > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-input-container').click();
        await page.locator('.dx-list-select-all > .dx-widget').click();
        await page.locator('.dxrd-right-tabs').click();
        await page.getByRole('button', { name: 'Submit' }).click();
        const menuItem = await page.getByRole('menuitem', { name: '' }).locator('div').nth(4);
        await menuItem.waitFor({ state: 'visible', timeout: 300000 });
        await menuItem.click();
        const downloadPromise = page.waitForEvent('download', { timeout: 300000 });
        await page.getByText(fileType.toUpperCase(), { exact: true }).click();
        const download = await downloadPromise;
        const filePath = path.join(downloadPath, `${fileName}.${fileType.toLowerCase()}`);

        await download.saveAs(filePath);

        console.log(`${fileType.toUpperCase()} saved successfully as ${fileName}.${fileType.toLowerCase()}`);
        console.log('Time taken:', (new Date().getTime() - startTime) / 1000, 'seconds');

    } catch (error) {
        console.error('Error during automation:', error);
    } finally {
        await context.close();
        await browser.close();
    }
}


module.exports = { downloadPrcReport };