export class ProductPage {
    constructor(page) {
        this.page = page;

        this.addToWishlistButton = page.getByRole('button', { name: 'Add to wishlist' });
        this.barNotification = page.locator('#bar-notification');

        this.productName = page.locator('.product-name');
        this.productSizeSelector = page.locator('#product_attribute_5_7_1');
        this.productPrice = page.locator('.product-price');
        this.productQty = page.locator('.qty-input');

        this.addToCartButton = page.locator('input[id^="add-to-cart-button"]');
    }

    async clickAddToWishlistButton() {
        await this.addToWishlistButton.click();
    }

    async getProductName() {
        const productaName = await this.productName.textContent();
        return productaName.trim(); 
    }

    async getProductSize() {
        const productSize = await this.productSizeSelector.locator('option:checked').textContent();
        return productSize.trim();
    }

    async getProductPrice() {
        const productPrice = await this.productPrice.textContent();
        return productPrice.trim();
    }

    async getProductQty() {
        const productQty = await this.productQty.getAttribute('value');
        return productQty;
    }

    async clickAddToCartButton() {
        await this.addToCartButton.click();
    }
 }
