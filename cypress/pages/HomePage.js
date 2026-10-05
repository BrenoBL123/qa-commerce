class HomePage {

    elementos = {
        listaProdutos: () => cy.get("#product-list .card"),
        botaoAdicionarCarrinho: () => cy.get(".add-to-cart"),
        quantidadeInput: () => cy.get('[id*="quantity-"]'),
        contadorCarrinho: () => cy.get("#cart-count"),
        linkCarrinho: () => cy.get(".nav-link").contains("CARRINHO"),
    }

    acessarHome() {
        cy.visit("/");
    }

    salvarInformacoesProduto(nomeProduto) {
        return cy.contains("#product-list .card legend a", nomeProduto, { matchCase: false })
        .closest(".card")
        .then(($card) => {
            const posicao = Cypress.$("#product-list .card").index($card);
            const preco = parseFloat($card.find("p:contains('Preço:')").text().replace("Preço: R$", ""));
            cy.log(`Informações do produto "${nomeProduto}" - Posição: ${posicao}, Preço: R$${preco.toFixed(2)}`);

        return cy.wrap({ posicao, preco });
        });
    }

    preencherQuantidadeCarrinho(posicao,quantidade) {
        this.elementos.quantidadeInput().eq(posicao).clear().type(quantidade);
        cy.log(`Adicionando ${quantidade} unidades do produto na posição ${posicao} ao carrinho.`);
    }

    enviarProdutoCarrinho(quantidade, nomeProduto) {
        return this.salvarInformacoesProduto(nomeProduto).then(({ posicao, preco }) => {
            this.preencherQuantidadeCarrinho(posicao, quantidade);
            this.elementos.botaoAdicionarCarrinho().eq(posicao).click();
            cy.log(`Produto "${nomeProduto}" adicionado ao carrinho com sucesso!`);

            return cy.wrap({ nome: nomeProduto, quantidade, preco });
        });
    }

    validarContadorCarrinho(quantidade) {
        this.elementos.contadorCarrinho().should("have.text", quantidade);
    }

    acessarTelaCarrinho() {
        this.elementos.linkCarrinho().click();
    }

}

export default new HomePage();