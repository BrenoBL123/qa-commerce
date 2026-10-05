class DashboardPage {

    elements = {
        nomeUsuario: () => cy.get("#user-name"),
    };

    validarPaginaAtual() {
        cy.url().should("include", "/dashboard.html");
    }

    validarNomeUsuarioLogado(nome) {
        this.elements.nomeUsuario().should("contain.text", nome);
    }
}
export default new DashboardPage();