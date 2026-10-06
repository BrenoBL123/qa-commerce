import { Given as Dado, When as Quando, Then as Entao } from "@badeball/cypress-cucumber-preprocessor";
import CarrinhoService from "../../../../services/CarrinhoService";
import LoginService from "../../../../services/LoginService";

Dado("que o usuário está logado", function () {
    LoginService.loginUsuarioPadrao().then((userId) => {
        this.userId = userId;
        CarrinhoService.limparCarrinho(userId);
    });
});

Quando("o usuário incluir {string} unidades do produto {string} via API", function (quantidade, nomeProduto) {
    CarrinhoService.incluirProdutoPorNome(this.userId, nomeProduto, quantidade).then((inclusao) => {
        this.inclusao = inclusao;
    });
});

Entao("a API deve retornar status 201 e a mensagem de sucesso", function () {
    CarrinhoService.validarInclusaoComSucesso(this.inclusao.response);
});

Entao("o carrinho do usuário deve conter o produto com a quantidade informada", function () {
    CarrinhoService.validarProdutoNoCarrinho(this.userId, this.inclusao.produto, this.inclusao.quantidade);
});
