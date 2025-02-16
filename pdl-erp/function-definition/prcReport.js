const { chromium } = require('playwright');

async function downloadPrcReport() {
    const browser = await chromium.launch({ headless: false }); // Set headless to false for visible browser
    const context = await browser.newContext();
    const page = await context.newPage();
    // await page.pause();

    try {
        await page.goto('https://pdlerp.pioneerdenim.com/RptCustoms/PRCReport');
        await page.getByRole('textbox', { name: 'Select LC Date' }).click();
        await page.getByRole('option', { name: 'Last Year' }).click();
        await page.locator('.dxrd-right-tabs').click();
        await page.locator('div:nth-child(2) > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-input-container').click();
        await page.locator('.dx-list-select-all > .dx-widget').click();
        await page.locator('.dxrd-right-tabs').click();
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.getByRole('menuitem', { name: '' }).locator('div').nth(4).click();
        const downloadPromise = page.waitForEvent('download');
        await page.getByText('XLSX', { exact: true }).click();
        const download = await downloadPromise;
        await download.saveAs('PrcReport.xlsx');

        console.log('XLSX saved successfully!');

    } catch (error) {
        console.error('Error during automation:', error);
    } finally {
        await browser.close();
    }
}


module.exports = { downloadPrcReport };