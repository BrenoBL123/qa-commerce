class CarrinhoPage {

    elementos = {
        itemPorNome: (nome) => cy.contains("#cart-list .cart-item legend", nome, { matchCase: false }).closest(".cart-item"),
        totalProdutos: () => cy.get("#total-products"),
    }

    validarInformacoesCarrinho(nomeProduto, quantidade, preco) {
        cy.log(`Validando informações do produto no carrinho: nome = ${nomeProduto}, quantidade = ${quantidade}, preço unitário = ${preco}`);
        this.elementos.itemPorNome(nomeProduto).within(() => {
            cy.contains("p", "Preço:").should("have.text", `Preço: R$${preco.toFixed(2)}`);
            cy.contains("p", "Quantidade:").should("have.text", `Quantidade: ${quantidade}`);
            cy.contains("p", "Total:").should("have.text", `Total: R$${(preco * quantidade).toFixed(2)}`);
        });
    }

    validarValorTotalCarrinho(quantidade, preco) {
        const valorTotalEsperado = (quantidade * preco).toFixed(2);
        cy.log(`Valor total esperado do carrinho: R$${valorTotalEsperado}`);
        this.elementos.totalProdutos().should("have.text", `Valor total do(s) Produto(s): R$${valorTotalEsperado}`);
    }
}

export default new CarrinhoPage();