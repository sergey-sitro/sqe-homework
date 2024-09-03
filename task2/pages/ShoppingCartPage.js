import { CheckoutPage } from "./CheckoutPage";

export class ShoppingCart {
    constructor(page) {
        this.page = page;

        this.productName = page.locator('.product a');
        this.productSize = page.locator('.product div');
        this.productPrice = page.locator('.product-unit-price');
        this.productQty = page.locator('.qty-input');

        this.itemCheckbox = page.locator('input[name="removefromcart"]');
        this.updateCartButton = page.getByRole('button', { name: 'Update shopping cart' });
        this.emptyCartHeading = page.getByText('Your Shopping Cart is empty!');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.termsOfServiceCheckbox = page.locator('#termsofservice');
    }

    async getProductName() {
        const productName = await this.productName.first().textContent();
        return productName.trim();
    }

    async getProductSize() {
        const productSize = await this.productSize.nth(1).textContent();
        return productSize.trim();
    }

    async getProductPrice() {
        const productPrice = await this.productPrice.first().textContent();
        return productPrice;
    }

    async getProductQty() {
        const productQty = await this.productQty.first().getAttribute('value');
        return productQty;
    }

    async clickItemCheckbox() {
        await this.itemCheckbox.click();
    }

    async clickUpdateCartButton() {
        await this.updateCartButton.click();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
        return new CheckoutPage(this.page);
    }

    async clickTermsOfServiceCheckbox() {
        await this.termsOfServiceCheckbox.click();
    }
 }
