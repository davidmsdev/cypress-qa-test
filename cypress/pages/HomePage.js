///<reference types="cypress" />

class HomePage {
    constructor() {
        // Enlaces de categorías
        this.categories = {
            phone: '#itemc[onclick="byCat(\'phone\')"]',
            notebook: '#itemc[onclick="byCat(\'notebook\')"]',
            monitor: '#itemc[onclick="byCat(\'monitor\')"]'
        };
        this.api_link = `https://api.demoblaze.com/bycat`
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
}

export default HomePage;