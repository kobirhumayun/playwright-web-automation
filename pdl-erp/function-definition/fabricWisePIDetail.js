const { chromium } = require('playwright');

async function downloadFabricWisePIDetail(url, fileName, fileType, downloadPath) {
    const browser = await chromium.launch({ headless: false }); // Set headless to false for visible browser
    const context = await browser.newContext();
    const page = await context.newPage();
    // await page.pause();

    try {

        await page.goto(url);
        await page.getByRole('combobox', { name: 'File From Date' }).fill('');
        await page.getByRole('combobox', { name: 'File To Date' }).fill('');
        await page.getByRole('combobox', { name: 'LC From Date' }).fill('');
        await page.getByRole('combobox', { name: 'LC To Date' }).fill('');
        await page.getByRole('combobox', { name: 'PI From Date' }).fill('');
        await page.getByRole('combobox', { name: 'PI To Date' }).fill('');
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.getByRole('menuitem', { name: '' }).locator('div').nth(4).click();
        const downloadPromise = page.waitForEvent('download', { timeout: 300000 });
        await page.getByText(fileType.toUpperCase(), { exact: true }).click();
        const download = await downloadPromise;
        const filePath = `${downloadPath}\\${fileName}.${fileType.toLowerCase()}`;
        await download.saveAs(filePath);

        console.log(`${fileType.toUpperCase()} saved successfully as PrcReport.${fileType.toLowerCase()}`);

    } catch (error) {
        console.error('Error during automation:', error);
    } finally {
        await context.close();
        await browser.close();
    }
}


module.exports = { downloadFabricWisePIDetail };