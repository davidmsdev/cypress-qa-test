///<reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import BasePage from '../../pages/BasePage';
import HomePage from '../../pages/HomePage';

const url = Cypress.env('Test').url;
const validStatusCodes = [200, 301, 302, 303, 304, 307, 308];
const basePage = new BasePage();
const homePage = new HomePage()
let categoriesLinks;
let categoriesNames;

Given('visitar la página de inicio', () => {
  basePage.visitHomePage(url);
});

When('obtengo todos los enlaces de las categorías', () => {
  categoriesLinks = homePage.getAllCategoriesValues();
  categoriesNames = homePage.getAllCategoriesKeys();
});

Then('verifico que la peticion devuelve un 200 y que el primer item de la lista coinicide con la categoria clicada', () => {
  cy.wrap(categoriesLinks).each((link, index) => {
    const categoryName = categoriesNames[index];

    cy.intercept('POST', homePage.api_link).as(`categoryRequest_${categoryName}`);
    
    cy.get(link).click();

    cy.wait(`@categoryRequest_${categoryName}`).then(({ response }) => {
      const firstItemCategory = response.body.Items[0].cat;
      cy.log(`Primer item categoría: ${firstItemCategory}`);
      
      expect(firstItemCategory).to.equal(categoryName);
      expect(response.statusCode).to.be.oneOf(validStatusCodes);
      expect(response.statusCode).to.not.be.within(400, 499);
    });
  });
});


