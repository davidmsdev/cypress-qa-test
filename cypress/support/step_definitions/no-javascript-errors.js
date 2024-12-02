import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

const url = Cypress.env('Test').url;

Given('el usuario visita la página de inicio', () => {
  /**
  cy.visit(url).then(() => {
    cy.window().then((window) => {
      // Lanzamos un error de forma explícita
      window.console.error('Este es un error forzado');
      throw new Error('Este es un error forzado');
    });
  });
  */
  cy.visit(url)
});

Then('no debería haber errores de JavaScript', () => {
  // Interceptamos cualquier error en la consola
  cy.window().then((window) => {
    const originalConsoleError = window.console.error;

    // Sustituimos console.error para espiar los mensajes de error
    cy.stub(window.console, 'error').callsFake((message) => {
      expect(message).to.not.include('Uncaught');
      expect(message).to.not.include('Error');
      // Llamamos al método original para mantener la funcionalidad de la consola
      originalConsoleError.apply(window.console, [message]);
    });
  });
});

