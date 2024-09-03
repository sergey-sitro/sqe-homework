export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.logInButton = page.getByRole('button', { name: 'Log in' });
    }
    
    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLogInButton() {
        await this.logInButton.click();
    }
}
