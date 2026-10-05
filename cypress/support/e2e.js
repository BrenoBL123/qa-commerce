import './commands'

// Executa o comando personalizado para limpar o carrinho antes de cada teste
beforeEach(() => {
    cy.limparCarrinho();
});