// @ts-ignore
import { expect } from '@playwright/test';

export class ContactUs {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.epam.com/about/who-we-are/contact';

        this.firstNameInput = page.getByLabel('First Name*');
        this.lastNameInput = page.getByLabel('Last Name*');
        this.emailInput = page.getByLabel('Email*');
        this.phoneInput = page.getByLabel('Phone*');

        this.validationTooltip = this.page.locator('div.validation-field');

        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async triggerValidationError(inputLocator) {
        await inputLocator.focus();
        await inputLocator.blur();
        await inputLocator.focus();
    }

    async validateEmptyErrorMessageDisplayed(inputLocator) {
        await this.triggerValidationError(inputLocator);

        const errorTooltip = this.validationTooltip.filter({ has: inputLocator });
        expect(await errorTooltip).toBeVisible();

        const errorTooltipText = errorTooltip.locator('.validation-tooltip .validation-text').textContent();
        expect(await errorTooltipText).toBe('This is a required field');
    }

    async checkEmailValidation(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailInvalid = !emailRegex.test(email);

        await this.emailInput.fill(email);

        if (isEmailInvalid) {
            await this.triggerValidationError(this.emailInput);

            const errorTooltip = this.validationTooltip.filter({ has: this.emailInput });
            expect(await errorTooltip).toBeVisible();

            const errorTooltipText = errorTooltip.locator('.validation-tooltip .validation-text').textContent();
            expect(await errorTooltipText).toBe('Incorrect email format');
        } else {
            await this.emailInput.blur();
            const errorTooltip = this.validationTooltip.filter({ has: this.emailInput });
            await expect(errorTooltip).not.toBeVisible();
        }
    }

    async checkPhoneValidation(phoneNumber) {
        const phoneRegex = /^[\d\s+;]{1,50}$/;
        const isPhoneNumberInvalid = !phoneRegex.test(phoneNumber);
    
        await this.phoneInput.fill(phoneNumber);
    
        if (isPhoneNumberInvalid) {
            await this.triggerValidationError(this.phoneInput);

            const errorTooltip = this.validationTooltip.filter({ has: this.phoneInput });
            await expect(errorTooltip).toBeVisible();
    
            const errorTooltipText = await errorTooltip.locator('.validation-tooltip .validation-text').textContent();
            expect(errorTooltipText).toBe('Only digits, space, plus, and semicolon are allowed. Maximum number of characters is 50.');
        } else {
            await this.phoneInput.blur();
            const errorTooltip = this.validationTooltip.filter({ has: this.phoneInput });
            await expect(errorTooltip).not.toBeVisible();
        }
    }

    generateLongPhoneNumber = () => {
        const symbols = '1234567890 +;';
        
        let longPhoneNumber = '';
        for (let i = 0; i < 51; i++) {
            longPhoneNumber += symbols[Math.floor(Math.random() * symbols.length)];
        }
        
        return longPhoneNumber;
    };
    
    
}
