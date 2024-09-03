// @ts-ignore
import { expect } from '@playwright/test';


export class HomePage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.epam.com/';
        this.pageTitle = 'EPAM | Software Engineering & Product Development Services';
        this.logo = page.getByRole('link', { name: 'EPAM EPAM' });
        
        this.themeSwitcher = page.locator('.header__vaulting-container .theme-switcher');
        this.languageSelector = page.locator('.location-selector__button');

        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.searchInput = page.getByPlaceholder('What are you looking for?');
        this.findButton = page.getByRole('button', { name: 'Find' });
        this.searchResultsCounter = page.locator('.search-results__counter');
        this.searchResultItems = page.locator('.search-results__items');

        this.locationsViewer = page.locator('.owl-item .locations-viewer-23__country-title');
        this.americasTab = page.getByRole('tab', { name: 'AMERICAS' });
        this.emeaTab = page.getByRole('tab', { name: 'EMEA' });
        this.apacTab = page.getByRole('tab', { name: 'APAC' });

        this.downloadButton = page.getByRole('link', { name: 'DOWNLOAD' });
    }

    async navigate(path = '') {
        await this.page.goto(this.url + path);
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle(this.pageTitle);
    }

    async clickThemeSwitcher() {
        await this.themeSwitcher.click();
    }

    async isLightModeOn() {
        const bodyClass = await this.page.locator('body').getAttribute('class');
        expect(bodyClass).toContain('light-mode');
    }

    async isDarkModeOn() {
        const bodyClass = await this.page.locator('body').getAttribute('class');
        await expect(bodyClass).toContain('dark-mode');
    }

    async clickLanguageSelector() {
        await this.languageSelector.click();
    }

    async clickLogo() {
        await this.logo.click();
    }

    async selectUaLanguage() {
        const uaLangSelector = this.page.getByRole('link', { name: 'Україна (Українська)' });
        await expect(uaLangSelector).toBeVisible();
        await uaLangSelector.click();
    }

    async isUaSiteOpened() {
        await expect(this.page.url()).toContain('careers.epam.ua');

        const langAttribute = await this.page.locator('html').getAttribute('lang');
        expect(langAttribute).toBe('uk-UA');
    }

    async clickAmericasTab() {
        await this.americasTab.click();
    }

    async clickEmeaTab() {
        await this.emeaTab.click();
    }

    async clickApacTab() {
        await this.apacTab.click();
    }

    async verifyAmericasRegions() {
        // Americas tab is active
        const americasTabClass = await this.americasTab.getAttribute('class');
        expect(americasTabClass).toContain('active');

        const countries = await this.locationsViewer.allTextContents();

        const expectedCountries = [
            'Colombia',
            'Dominican Republic',
            'Mexico',
            'United States',
            'Canada'
        ];

        for (const country of expectedCountries) {
            await expect(countries).toContain(country);
        }
    }

    async verifyEmeaRegions() {
        // EMEA tab is active
        const emeaTabClass = await this.emeaTab.getAttribute('class');
        expect(emeaTabClass).toContain('active');

        const countries = await this.locationsViewer.allTextContents();

        const expectedCountries = [
            'Armenia',
            'Austria',
            'Belarus',
            'Belgium',
            'Bulgaria',
            'Croatia',
            'Czech Republic',
            'France',
            'Georgia',
            'Germany',
            'Greece',
            'Hungary',
            'Ireland',
            'Israel',
            'Italy',
            'Kazakhstan',
            'Latvia',
            'Lithuania',
            'Malta',
            'Montenegro',
            'Netherlands',
            'Poland',
            'Portugal',
            'Romania',
            'Spain',
            'Sweden',
            'Switzerland',
            'Ukraine',
            'United Arab Emirates',
            'United Kingdom',
            'Uzbekistan'
        ];

        for (const country of expectedCountries) {
            await expect(countries).toContain(country);
        }
    }

    async verifyApacRegions() {
        // APAC tab is active
        const apacTabClass = await this.apacTab.getAttribute('class');
        expect(apacTabClass).toContain('active');

        const countries = await this.locationsViewer.allTextContents();

        const expectedCountries = [
            'Australia',
            'China Mainland',
            'Hong Kong SAR',
            'India',
            'Japan',
            'Malaysia',
            'Singapore',
            'Vietnam'
        ];

        for (const country of expectedCountries) {
            await expect(countries).toContain(country);
        }
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async searchByCriteria(criteria) {
        await this.searchInput.fill(criteria);
        await this.findButton.click();
    }

    async validateSearchResults(criteria) {
        await expect(this.searchResultsCounter).toBeVisible();
        const searchResultHeading = await this.searchResultsCounter.textContent();
        await expect(searchResultHeading).toContain(`results for "${criteria}"`);
        await expect(this.searchResultItems).toBeVisible();
    }

    async clickDownloadButton() {
        await this.downloadButton.click();
    }
}
