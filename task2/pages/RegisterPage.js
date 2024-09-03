// @ts-ignore
import { faker } from '@faker-js/faker';

export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.maleRadiobutton = page.locator('#gender-male');
        this.femaleRadiobutton = page.locator('#gender-female');
        this.firstNameInput = page.locator('#FirstName');
        this.lastNameInput = page.locator('#LastName');
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.confirmPasswordInput = page.locator('#ConfirmPassword');
        this.registerButtton = page.locator('#register-button');
        this.registrationSuccessMessage = page.getByText('Your registration completed');

    }
    
    async selectRandomGender() {
        const genderOptions = [this.maleRadiobutton, this.femaleRadiobutton];
        const randomOption = genderOptions[Math.floor(Math.random() * genderOptions.length)];
        await randomOption.check();
    }

    async enterRandomFirstName() {
        const randomFirstName = faker.name.firstName();
        await this.firstNameInput.fill(randomFirstName);
    }

    async enterRandomLastName() {
        const randomLastName = faker.name.lastName();
        await this.lastNameInput.fill(randomLastName);
    }

    async enterRandomEmail() {
        const randomEmail = faker.internet.email();
        await this.emailInput.fill(randomEmail);
    }

    async enterRandomPassword() {
        const randomPassword = faker.internet.password();
        await this.passwordInput.fill(randomPassword);
        await this.confirmPasswordInput.fill(randomPassword);
    }

    async clickRegisterButton() {
        await this.registerButtton.click();
    }
}
