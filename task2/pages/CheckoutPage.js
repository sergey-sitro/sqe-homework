// @ts-ignore
import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.countryDropdown = page.getByLabel('Country:');
        this.cityInput = page.getByLabel('City:');
        this.fisrtAddressInput = page.getByLabel('Address 1:');
        this.zipInput = page.getByLabel('Zip / postal code:');
        this.phoneInput = page.getByLabel('Phone number:');

        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.backButton = page.getByRole('link', { name: 'Back' });
        this.confirmButton = page.getByRole('button', { name: 'Confirm' });
        this.activeTab = page.locator('.active');

        this.checkoutSuccessMessage = page.getByText('Your order has been successfully processed!');
    }

   async selectCountry(country) {
    await this.countryDropdown.click();
    await this.countryDropdown.selectOption({ label: `${country}` });
   }

   async fillCity(city) {
    await this.cityInput.fill(city);
   }

   async fillFirstAddress(address) {
    await this.fisrtAddressInput.fill(address);
   }

   async fillZip(zip) {
    await this.zipInput.fill(zip);
   }

   async fillPhoneNumber(phone) {
    await this.phoneInput.fill(phone);
   }

   async clickContinueButton() {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
    await expect(this.activeTab).toBeVisible();
    await expect(this.backButton).toBeVisible();
    await this.page.waitForTimeout(1000);
   }

   async clickConfirmButton() {
    await this.confirmButton.click();
   }
 }
