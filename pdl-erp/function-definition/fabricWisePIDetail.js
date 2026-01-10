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
        const today = new Date();
        const oneYearBack = new Date();
        oneYearBack.setFullYear(today.getFullYear() - 1);

        const formatDate = (date) => {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = months[d.getMonth()];
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        };

        await page.getByRole('combobox', { name: 'PI From Date' }).fill(formatDate(oneYearBack));
        await page.getByRole('combobox', { name: 'PI To Date' }).fill(formatDate(today));
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