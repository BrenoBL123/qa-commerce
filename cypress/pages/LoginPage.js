class LoginPage {

    elementos = {
        emailInput: () => cy.get("#email"),
        senhaInput: () => cy.get("#password"),
        loginForm: () => cy.get("#login-form"),
    }

    acessarLogin() {
        cy.visit("/login.html");
    }

    fazerLogin(email, senha) {
        this.elementos.emailInput().type(email);
        this.elementos.senhaInput().type(senha, { log: false });
        this.elementos.loginForm().submit();
    }
}

export default new LoginPage();