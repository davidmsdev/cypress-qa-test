class LoginPage {
    constructor() {
        this.emailInput = '#loginusername'; 
        this.passwordInput = '#loginpassword'; 
        this.loginButton = 'button[onclick="logIn()"]';
        
    }

    login(email, password) {
        cy.wait(400)
        cy.get(this.emailInput).type(email);
        cy.get(this.passwordInput).type(password);
        cy.get(this.loginButton).click();
    }
}

export default LoginPage;

  