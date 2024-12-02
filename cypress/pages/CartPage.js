class CartPage {
    constructor() {
        this.cartTable = '#tbodyid'; 
        this.totalPrice = '#totalp';
    }

    verifyProductInCart(productName, productPrice, expectedCount) {
        cy.get(this.cartTable).find('tr').should('have.length', expectedCount);
        cy.get(this.cartTable).contains(productName).should('exist');
        cy.get(this.cartTable).contains(productPrice).should('exist');
    }

    verifyTotalPrice(expectedPrice) {
        if (expectedPrice > 0) {
            cy.get(this.totalPrice).should('have.text', expectedPrice.toString());
        } else {
            cy.get(this.totalPrice).should('not.have.text');  
        }
    }

    deleteProduct(productName) {
        cy.get(this.cartTable).contains(productName)  
            .parents('tr') 
            .find('td a') 
            .contains('Delete')  
            .click();  
    }

    verifyCartIsEmpty() {
        cy.get(this.cartTable).should(`not.have.descendants`, `tr`);
        cy.get(this.totalPrice).should('not.have.text');
    }
}

export default CartPage;
