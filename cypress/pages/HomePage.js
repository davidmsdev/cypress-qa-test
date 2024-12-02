///<reference types="cypress" />

class HomePage {
    constructor() {
        this.categories = {
            phone: '#itemc[onclick="byCat(\'phone\')"]',
            notebook: '#itemc[onclick="byCat(\'notebook\')"]',
            monitor: '#itemc[onclick="byCat(\'monitor\')"]'
        };
        this.api_link = 'https://api.demoblaze.com/bycat'
        this.productGrid = '#tbodyid'; 
        this.productLink = '.hrefch'; 
    }

    clickCategory(category) {
        cy.get(this.categories[category]).click();
    }

    getAllCategoriesValues() {
        return Object.values(this.categories);
    }

    getAllCategoriesKeys() {
        return Object.keys(this.categories);
    }

    selectProduct(productName) {
        cy.get(this.productGrid)
            .contains(this.productLink, productName)
            .click();
    }
}

export default HomePage;