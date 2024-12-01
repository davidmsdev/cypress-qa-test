import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import BasePage from '../../pages/BasePage';

const url = Cypress.env('Test').url;
const validStatusCodes = [200, 301, 302, 303, 304, 307, 308];
const basePage = new BasePage();
let navLinks;

Given('visito la página de inicio', () => {
  basePage.visitHomePage(url);
});

When('obtengo todos los enlaces de navegación', () => {
  navLinks = basePage.getNavLinks();
});

Then('verifico que todas las peticiones de cada enlace devuelvan un código de estado 200 o 30x y ninguna 40x', () => {
  for (const link of navLinks) {
    cy.intercept('GET', link).as('pageRequest');
    cy.visit(link);
  
    cy.wait('@pageRequest').then(({ response }) => {
      const statusCode = response.statusCode;
      cy.log(`Enlace: ${link} -> Estado: ${statusCode}`);
      expect(statusCode).to.be.oneOf(validStatusCodes);
      expect(statusCode).to.not.be.within(400, 499);
    });
  }
});


