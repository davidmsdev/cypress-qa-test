class ProductPage {
    constructor() {
        this.productName = '.name'; 
        this.productPrice = '.price-container'; 
        this.addToCartButton = 'a.btn-success'; 
    }

    verifyProductDetails(expectedName, expectedPrice) {
        cy.get(this.productName).should('have.text', expectedName);
        cy.get(this.productPrice).should('contain.text', expectedPrice);
    }

    addToCart() {
        cy.get(this.addToCartButton).click();
        //cy.wait(500);
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Product added');
        });
        cy.on('window:confirm', () => true); 
    }
}

export default ProductPage;
