// Comando personalizado para limpar o carrinho de compras
Cypress.Commands.add("limparCarrinho", () => {
    cy.request("POST", "/api/limpar-carrinho", { userId: 1 });
});