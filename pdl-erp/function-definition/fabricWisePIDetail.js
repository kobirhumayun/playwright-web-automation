const { chromium } = require('playwright');
const path = require('path');

async function downloadFabricWisePIDetail(url, fileName, fileType, downloadPath) {
    const browser = await chromium.launch({ headless: true }); // Set headless to false for visible browser
    const context = await browser.newContext();
    const page = await context.newPage();
    context.setDefaultTimeout(300000);
    // await page.pause();

    try {

        const startTime = new Date().getTime();

        await page.goto(url);
        await page.getByRole('combobox', { name: 'File From Date' }).fill('');
        await page.getByRole('combobox', { name: 'File To Date' }).fill('');
        await page.getByRole('combobox', { name: 'LC From Date' }).fill('');
        await page.getByRole('combobox', { name: 'LC To Date' }).fill('');
        await page.getByRole('combobox', { name: 'PI From Date' }).fill('');
        await page.getByRole('combobox', { name: 'PI To Date' }).fill('');
        await page.getByRole('button', { name: 'Submit' }).click();
        const menuItem = await page.getByRole('menu', { name: 'Export To' });
        await menuItem.waitFor({ state: 'visible' });
        await menuItem.click();
        const downloadPromise = page.waitForEvent('download');
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


module.exports = { downloadFabricWisePIDetail };