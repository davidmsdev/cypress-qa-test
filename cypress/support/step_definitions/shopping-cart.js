import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import BasePage from '../../pages/BasePage';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';
import productData from '../../fixtures/products.json';

const basePage = new BasePage();
const homePage = new HomePage();
const loginPage = new LoginPage();
const productPage = new ProductPage();
const cartPage = new CartPage();

const url = Cypress.env('Test').url;
const user = Cypress.env('Test').userEmail
const password = Cypress.env('Test').userPassword
const loginModal = basePage.modal_links.logIn
let totalPriceBeforeDeletion = 0;

Given('navego al sitio web', () => {
    basePage.visitHomePage(url);
});

When('abro el modal de inicio de sesión', () => {
    basePage.openModal(loginModal);
});

When('inicio sesión con credenciales válidas', () => {
    loginPage.login(user, password);
});

Then('debería ver el mensaje de bienvenida', () => {
    basePage.verifyLogin(user);
});

Then('añado todos los productos al carrito, el carrito debería mostrar los productos correctos, las cantidades correctas y el precio total correcto', () => {
    productData.products.forEach((product, index) => {
        cy.log(`Producto a añadir -> ${product.name}`)
        homePage.selectProduct(product.name);
        productPage.verifyProductDetails(product.name, product.price);
        productPage.addToCart();

        basePage.clickCartMenu();
        const expectedQuantity = index + 1;  
        const expectedTotalPrice = totalPriceBeforeDeletion + product.price;

        totalPriceBeforeDeletion = expectedTotalPrice;
        cartPage.verifyProductInCart(product.name, product.price, expectedQuantity);
        cartPage.verifyTotalPrice(expectedTotalPrice);
        basePage.clickHomeMenu();
    })
});

When('elimino todos los productos del carrito', () => {
    basePage.clickCartMenu();
    productData.products.forEach((product) => {
        cartPage.deleteProduct(product.name);
        cy.get(cartPage.cartTable).should('not.contain', product.name);
        const expectedTotalPrice = totalPriceBeforeDeletion - product.price;
        cartPage.verifyTotalPrice(expectedTotalPrice);
        totalPriceBeforeDeletion = expectedTotalPrice;
    });
});


Then('el carrito debería estar vacío y el total actualizado correctamente', () => {
    cartPage.verifyCartIsEmpty();
});
