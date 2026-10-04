class DashboardPage {

    elements = {
        userName: () => cy.get("#user-name"),
    };
    
    validarPaginaAtual() {
        cy.url().should("include", "/dashboard.html");
    }

    validarNomeUsuarioLogado(nome) {
        this.elements.userName().should("contain.text", nome);
    }
}

export default new DashboardPage();