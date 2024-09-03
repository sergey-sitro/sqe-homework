// @ts-ignore
import { test, expect } from '@playwright/test';
import { HomePage } from '../../task2/pages/HomePage';

let homePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

// 1) Verify that allows register a User
test('Verify that allows register a User', async () => {
    const registerPage = await homePage.clickRegisterButton();

    await registerPage.selectRandomGender();
    await registerPage.enterRandomFirstName();
    await registerPage.enterRandomLastName();
    await registerPage.enterRandomEmail();
    await registerPage.enterRandomPassword();
    await registerPage.clickRegisterButton();

    await expect(registerPage.registrationSuccessMessage).toBeVisible();
});

// 2) Verify that allows login a User
test('Verify that allows login a User', async () => {
    const loginPage = await homePage.clickLoginButton();

    const userEmail = 'testmail@emal.com';
    const userPassword = 'vEzsbb5@Sr9S7';

    await loginPage.enterEmail(userEmail);
    await loginPage.enterPassword(userPassword);
    await loginPage.clickLogInButton();

    await expect(await homePage.headerAccountLink.textContent()).toStrictEqual(userEmail);
    await expect(homePage.logOutbutton).toBeVisible();
});

// 3) Verify that ‘Computers’ group has 3 sub-groups with correct names
test('Verify that Computers group has 3 sub-groups with correct names', async ({page}) => {
    await homePage.computersMenuItem.hover();
    await homePage.isCategoryVisible('Desktops');
    await homePage.isCategoryVisible('Notebooks');
    await homePage.isCategoryVisible('Accessories');

    await homePage.computersMenuItem.click();
    await expect(page.getByRole('heading', { name: 'Desktops' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Notebooks' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Accessories' })).toBeVisible();
});

// 4) Verify that allows sorting items (different options)
test('Verify that allows sorting items (A-Z)', async ({page}) => {
    await homePage.clickApparelAndShoesMenuItem();
    await homePage.clickAtoZ();
    
    await page.waitForURL(homePage.url + 'apparel-shoes?orderby=5');

    const productTitles = await page.locator('.product-title a').allTextContents();    
    const normalizedTitles = productTitles.map(title => title.trim().toLowerCase());
    const sortedTitles = [...normalizedTitles].sort();

    expect(normalizedTitles).toEqual(sortedTitles);
});

test('Verify that allows sorting items (Low to High))', async ({page}) => {
    await homePage.clickApparelAndShoesMenuItem();
    await homePage.clickLowtoHigh();
    
    await page.waitForURL(homePage.url + 'apparel-shoes?orderby=10');

    const priceElements = await page.locator('.product-item .prices .actual-price').allTextContents();
    const prices = priceElements.map(price => parseFloat(price.replace(/[^0-9.-]+/g, '')));
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
});

// 5) Verify that allows changing number of items on page
test('Verify that allows changing number of items on page', async ({page}) => {
    let productItems
    await homePage.clickApparelAndShoesMenuItem();

    await homePage.changeItemsPerPage(4);
    productItems = await page.locator('.product-item');
    expect(await productItems.count()).toEqual(4);

    await homePage.changeItemsPerPage(8);
    productItems = await page.locator('.product-item');
    expect(await productItems.count()).toEqual(8);

    await homePage.changeItemsPerPage(12);
    productItems = await page.locator('.product-item');
    expect(await productItems.count()).toEqual(12);
});

// 6) Verify that allows adding an item to the Wishlist
test('Verify that allows adding an item to the Wishlist', async () => {
    await homePage.clickApparelAndShoesMenuItem();
    const productPage = await homePage.clickFirstAvailableProduct();

    await productPage.clickAddToWishlistButton();
    await expect(productPage.barNotification).toBeVisible();

    expect(await homePage.wishlistQuantity.textContent()).toEqual('(1)');

    const productName = await productPage.getProductName();
    const productSize = await productPage.getProductSize();
    const productPrice = await productPage.getProductPrice();
    const productQty = await productPage.getProductQty();

    const wishlistPage = await homePage.clickWishlistLink();

    expect(await wishlistPage.getProductName()).toStrictEqual(productName);
    expect(await wishlistPage.getProductSize()).toStrictEqual('Size: ' + productSize);
    expect(await wishlistPage.getProductPrice()).toStrictEqual(productPrice);
    expect(await wishlistPage.getProductQty()).toStrictEqual(productQty);
});

// 7) Verify that allows adding an item to the cart
test('Verify that allows adding an item to the cart', async () => {
    await homePage.clickApparelAndShoesMenuItem();
    const productPage = await homePage.clickFirstAvailableProduct();

    await productPage.clickAddToCartButton();
    await expect(productPage.barNotification).toBeVisible();

    expect(await homePage.shoppingCartQuantity.textContent()).toEqual('(1)');

    const productName = await productPage.getProductName();
    const productSize = await productPage.getProductSize();
    const productPrice = await productPage.getProductPrice();
    const productQty = await productPage.getProductQty();

    const shoppingCartPage = await homePage.clickShoppingCartLink();

    expect(await shoppingCartPage.getProductName()).toStrictEqual(productName);
    expect(await shoppingCartPage.getProductSize()).toStrictEqual('Size: ' + productSize);
    expect(await shoppingCartPage.getProductPrice()).toStrictEqual(productPrice);
    expect(await shoppingCartPage.getProductQty()).toStrictEqual(productQty);
});

// 8) Verify that allows removing an item from the card
test('Verify that allows removing an item from the card', async () => {
    await homePage.clickApparelAndShoesMenuItem();
    const productPage = await homePage.clickFirstAvailableProduct();

    await productPage.clickAddToCartButton();
    await expect(productPage.barNotification).toBeVisible();

    expect(await homePage.shoppingCartQuantity.textContent()).toEqual('(1)');

    const shoppingCartPage = await homePage.clickShoppingCartLink();

    await shoppingCartPage.clickItemCheckbox();
    await shoppingCartPage.clickUpdateCartButton();

    await expect(shoppingCartPage.emptyCartHeading).toBeVisible();
});

// 9) Verify that allows checkout an item
test('Verify that allows checkout an item', async () => {
    const registerPage = await homePage.clickRegisterButton();

    await registerPage.selectRandomGender();
    await registerPage.enterRandomFirstName();
    await registerPage.enterRandomLastName();
    await registerPage.enterRandomEmail();
    await registerPage.enterRandomPassword();
    await registerPage.clickRegisterButton();
    
    await homePage.clickApparelAndShoesMenuItem();
    const productPage = await homePage.clickFirstAvailableProduct();

    await productPage.clickAddToCartButton();
    await expect(productPage.barNotification).toBeVisible();

    const shoppingCartPage = await homePage.clickShoppingCartLink();

    await shoppingCartPage.clickTermsOfServiceCheckbox();
    
    const checkoutPage = await shoppingCartPage.clickCheckoutButton();

    await checkoutPage.selectCountry('United States');
    await checkoutPage.fillCity('New York');
    await checkoutPage.fillFirstAddress('1 Main Str');
    await checkoutPage.fillZip('50102');
    await checkoutPage.fillPhoneNumber('30215824');

    await checkoutPage.clickContinueButton();
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickConfirmButton();

    await expect(checkoutPage.checkoutSuccessMessage).toBeVisible('Checkout Success Message is displayed');
});