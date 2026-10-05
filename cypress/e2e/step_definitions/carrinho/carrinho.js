import { Given as Dado, When as Quando, Then as Entao } from "@badeball/cypress-cucumber-preprocessor";
import CarrinhoPage from "../../../pages/CarrinhoPage";
import HomePage from "../../../pages/HomePage";


Dado ("que o cliente está na página inicial da loja", () => {
    HomePage.acessarHome();
});

Quando ("o cliente adiciona {string} vezes o produto {string} no carrinho", function (quantidade,nomeProduto) {
    HomePage.enviarProdutoCarrinho(quantidade, nomeProduto).then((produto) => {
        this.produto = produto;
    });
    HomePage.validarContadorCarrinho(quantidade);
});

Entao ("o produto deve ser exibido no carrinho", () => {
    HomePage.acessarTelaCarrinho();
});

Entao ("o carrinho deve exibir o nome, a quantidade do produto e os preços", function () {
    CarrinhoPage.validarInformacoesCarrinho(this.produto.nome, this.produto.quantidade, this.produto.preco);
});

Entao ("o valor total do carrinho deve corresponder à soma de preço dos produtos", function () {
    CarrinhoPage.validarValorTotalCarrinho(this.produto.quantidade, this.produto.preco);
    CarrinhoPage.limparCarrinho();
});