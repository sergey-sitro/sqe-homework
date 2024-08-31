// @ts-ignore
import { test } from '@playwright/test';
import { ContactUs } from '../../../task1/pages/ContactUsPage';

let contactUsPage;

test.beforeEach(async ({ page }) => {
    contactUsPage = new ContactUs(page);
    await contactUsPage.navigate();
  });

// 7) Check form's fields validation
test.describe('Check form\'s fields validation', () => {
  test.describe('Check empty fields validation', () => {  
    test('Check empty First Name input validation', async () => {
          await contactUsPage.validateEmptyErrorMessageDisplayed(contactUsPage.firstNameInput);
    });

    test('Check empty Last Name input validation', async () => {
      await contactUsPage.validateEmptyErrorMessageDisplayed(contactUsPage.lastNameInput);
    });

    test('Check empty Email input validation', async () => {
      await contactUsPage.validateEmptyErrorMessageDisplayed(contactUsPage.emailInput);
    });

    test('Check empty Phone input validation', async () => {
      await contactUsPage.validateEmptyErrorMessageDisplayed(contactUsPage.phoneInput);
    });
  });

  test('Check Email field validation', async () => {
    await contactUsPage.checkEmailValidation('test');
    await contactUsPage.checkEmailValidation('test@');
    await contactUsPage.checkEmailValidation('test@email');
    await contactUsPage.checkEmailValidation('test@email.');
    await contactUsPage.checkEmailValidation('test@email.com');
  });

  test('Check Phone field validation', async () => {
    // Negative
    await contactUsPage.checkPhoneValidation('a');
    await contactUsPage.checkPhoneValidation('$');
    await contactUsPage.checkPhoneValidation(contactUsPage.generateLongPhoneNumber());
    
    // Positive
    await contactUsPage.checkPhoneValidation('1');
    await contactUsPage.checkPhoneValidation('+');
    await contactUsPage.checkPhoneValidation(' ');
    await contactUsPage.checkPhoneValidation('+1 212 456 7890');
  });
});
