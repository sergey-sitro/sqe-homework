// @ts-ignore
import { test, expect } from '@playwright/test';
import { HomePage } from '../../../task1/pages/HomePage';
import { Footer } from '../../../task1/components/Footer';
import fs from 'fs';

let homePage;
let footer;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    footer = new Footer(page);
    await homePage.navigate();
  });

// 1) Check the title is correct
test('Check the title is correct', async () => {
    await homePage.verifyTitle();
  });

// 2) Check the ability to switch Light / Dark mode
test('Check the ability to switch Light / Dark mode', async () => {
    await homePage.clickThemeSwitcher();
    await homePage.isLightModeOn();

    await homePage.clickThemeSwitcher();
    await homePage.isDarkModeOn();
  });

// 3) Check that allow to change language to UA
test('Check that allow to change language to UA', async () => {
    await homePage.clickLanguageSelector();
    await homePage.selectUaLanguage();
    await homePage.isUaSiteOpened();
  });

// 4) Check the policies list
test('Check the policies list', async () => {
    await footer.validatePolicies();
  });

// 5) Check that allow to switch location list by region
test.describe('Check that allow to switch location list by region', () => {

    test('Check that Americas locations are displayed', async () => {
        await homePage.verifyAmericasRegions();
    });

    test('Check that EMEA locations are displayed', async () => {
        await homePage.clickEmeaTab();
        await homePage.verifyEmeaRegions();
    });

    test('Check that APAC locations are displayed', async () => {
        await homePage.clickApacTab();
        await homePage.verifyApacRegions();
    });
})

// 6) Check the search function
test('Check the search function', async () => {
    await homePage.clickSearchButton();

    const searchCriteria = 'AI';
    await homePage.searchByCriteria(searchCriteria);
    await homePage.validateSearchResults(searchCriteria);
  });

// 8) Check that the Company logo on the header lead to the main page
test('Check that the Company logo on the header lead to the main page', async ({page}) => {
  await homePage.navigate('about');
  await homePage.clickLogo();

  expect(await page.url()).toStrictEqual(homePage.url);
});

// 9) Check that allows to download report
test('Check that allows to download report', async ({page}) => {
  await homePage.navigate('about');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    await homePage.clickDownloadButton()
  ]);
  
  // Get the file name
  const suggestedFilename = download.suggestedFilename();

  // Save the download to a temporary directory
  const downloadPath = `./downloads/${suggestedFilename}`;
  await download.saveAs(downloadPath);

  // Verify that the file exists
  expect(fs.existsSync(downloadPath)).toBeTruthy();
  expect(suggestedFilename).toStrictEqual('EPAM_Corporate_Overview_Q4_EOY.pdf');

  // Clean up
  fs.unlinkSync(downloadPath);
});