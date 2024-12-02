///<reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import BasePage from '../../pages/BasePage';

const basePage = new BasePage();
const url = Cypress.env('Test').url;
let modalsLinks;

Given('que visito la página de inicio', () => {
    basePage.visitHomePage(url);
});

When('obtengo todos los enlaces de tipo modal', () => {
    modalsLinks = basePage.getModalLinks();
});

Then('verifico que cada popup se abre y se cierra correctamente', () => {
    modalsLinks.forEach((modal) => {
        basePage.openModal(modal);
        basePage.verifyModalVisibility(modal);
        basePage.verifyCloseButton(modal);

        cy.wait(400);

        basePage.closeModal(modal);
        basePage.verifyModalClosed(modal);
    });
});






