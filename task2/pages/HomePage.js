// @ts-ignore
import { expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { ProductPage } from './ProductPage';
import { WishlistPage } from './WishlistPage';
import { ShoppingCart } from './ShoppingCartPage';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.url = 'https://demowebshop.tricentis.com/';

        this.registerButton = page.getByRole('link', { name: 'Register' });
        this.loginButton = page.getByRole('link', { name: 'Log in' });
        this.headerAccountLink = page.locator('.account').first();
        this.wishlistQuantity = page.locator('.wishlist-qty');
        this.shoppingCartQuantity = page.locator('.cart-qty');
        this.logOutbutton = page.getByRole('link', { name: 'Log out' });

        this.headerMenu = page.locator('.header-menu');
        this.computersMenuItem = this.headerMenu.getByRole('link', { name: 'Computers' });
        this.apparelAndShoesMenuItem = this.headerMenu.getByRole('link', { name: 'Apparel & Shoes' });

        this.orderBySelector = page.locator('#products-orderby');
        this.displayPerPageSelector = page.locator('#products-pagesize');

        this.productItem = page.locator('.product-item');
    }

    async navigate(path = '') {
        await this.page.goto(this.url + path);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
        return new RegisterPage(this.page);
    }

    async clickLoginButton() {
        await this.loginButton.click();
        return new LoginPage(this.page);
    }

    async isCategoryVisible(category) {
        expect(await this.page.getByRole('link', { name: `${category}` })).toBeVisible();
    }

    async clickApparelAndShoesMenuItem() {
        await this.apparelAndShoesMenuItem.click();
    }

    async clickOrderBySelector() {
        await this.orderBySelector.click();
    }

    async clickAtoZ() {
        await this.clickOrderBySelector();
        await this.orderBySelector.selectOption({ label: 'Name: A to Z' });
    }

    async clickLowtoHigh() {
        await this.clickOrderBySelector();
        await this.orderBySelector.selectOption({ label: 'Price: Low to High' });
    }

    async changeItemsPerPage(items) {
        await this.displayPerPageSelector.click();
        await this.displayPerPageSelector.selectOption({ label: `${items}` });
        await this.page.waitForURL(this.url + `apparel-shoes?pagesize=${items}`);
    }

    async clickFirstAvailableProduct() {
        await this.productItem.first().click();
        return new ProductPage(this.page);
    }

    async clickWishlistLink() {
        await this.wishlistQuantity.click();
        return new WishlistPage(this.page);
    }

    async clickShoppingCartLink() {
        await this.shoppingCartQuantity.click();
        return new ShoppingCart(this.page);
    }
 }
