export class WishlistPage {
    constructor(page) {
        this.page = page;

        this.productName = page.locator('.product a');
        this.productSize = page.locator('.product div');
        this.productPrice = page.locator('.product-unit-price');
        this.productQty = page.locator('.qty-input');
    }

    async getProductName() {
        const productName = await this.productName.textContent();
        return productName.trim();
    }

    async getProductSize() {
        const productSize = await this.productSize.textContent();
        return productSize.trim();
    }

    async getProductPrice() {
        const productPrice = await this.productPrice.textContent();
        return productPrice;
    }

    async getProductQty() {
        const productQty = await this.productQty.getAttribute('value');
        return productQty;
    }
 }
