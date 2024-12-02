///<reference types="cypress" />

class BasePage {
    constructor() {
        this.nav_links = {
            home: 'https://demoblaze.com/index.html',
            cart: 'https://demoblaze.com/cart.html',
        };
        this.modal_links = {
            contact: '#exampleModal',
            aboutUs: '#videoModal',
            logIn: '#logInModal',
            signUp: '#signInModal',
        };
        this.closeModal_button = `button.close[type="button"]`;
        this.closeModalFooterButton = `> .modal-dialog > .modal-content > .modal-footer > .btn-secondary`;
    }

    visitHomePage(url) {
        cy.visit(url);
    }

    getNavLinks() {
        return Object.values(this.nav_links);
    }

    getModalLinks() {
        return Object.values(this.modal_links);
    }

    openModal(modal) {
        cy.get(`[data-target="${modal}"]`).click();
    }

    verifyModalVisibility(modal) {
        cy.get(modal)
            .should('be.visible')
            .and('have.class', 'show');
    }

    verifyCloseButton(modal) {
        cy.get(`${modal} .modal-header button.close[type="button"]`)
            .should('be.visible');
    }

    closeModal(modal) {
        cy.get(`${modal} ${this.closeModalFooterButton}`).click();
    }

    verifyModalClosed(modal) {
        cy.get(modal)
            .should('not.be.visible')  
            .and('not.have.class', 'show');
    }
}

export default BasePage;
