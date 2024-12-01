///<reference types="cypress" />

class BasePage {
    constructor() {
        this.nav_links = {
            home: 'https://demoblaze.com/index.html',
            cart: 'https://demoblaze.com/cart.html',
        };
    }
    visitHomePage(url) {
        cy.visit(url)
    }

    getNavLinks() {
        return Object.values(this.nav_links);
    }
}

export default BasePage;