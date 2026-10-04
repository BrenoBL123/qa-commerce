class LoginPage {

    elements = {
        emailInput: () => cy.get("#email"),
        passwordInput: () => cy.get("#password"),
        loginForm: () => cy.get("#login-form"),
    };

    acessarLogin() {
        cy.visit("/login.html");
    }

    fazerLogin(email, senha) {
        this.elements.emailInput().type(email);
        this.elements.passwordInput().type(senha, { log: false });
        this.elements.loginForm().submit();
    }
}

export default new LoginPage();