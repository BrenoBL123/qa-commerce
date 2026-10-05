import { Given as Dado, When as Quando, Then as Entao } from "@badeball/cypress-cucumber-preprocessor";
import CheckoutPage from "../../../pages/CheckoutPage";

Dado ("que o cliente está na página de checkout", () => {
    CheckoutPage.acessarCheckout();
});

Quando ("o cliente tenta confirmar o pedido sem preencher os campos obrigatórios", () => {
    CheckoutPage.finalizarPedido();
});

Entao ("deve ser exibida uma mensagem de erro para cada campo obrigatório", () => {
    CheckoutPage.validarTodosOsErrosObrigatorios();
});

Entao("o pedido não deve ser finalizado", () => {
    CheckoutPage.validarPermaneceuCheckout();
});

Quando ("o cliente preenche todos os campos obrigatórios, exceto {string}", function (nomeCampo) {
    this.campoNaoPreenchido = nomeCampo;
    CheckoutPage.preencherCamposObrigatoriosExceto(nomeCampo);
});

Entao ("escolhe um método de pagamento {string}", function (meioPagamento) {
    this.meioPagamento = meioPagamento;
    CheckoutPage.escolherMeioPagamento(meioPagamento);
});

Entao ("informações de pagamento", function () {
    if (CheckoutPage.verificarPagamentoComCartao(this.meioPagamento)) {
        CheckoutPage.preencherDadosCartaoExceto(this.campoNaoPreenchido);
    }
});

Entao ("tenta confirmar o pedido", () =>{
    CheckoutPage.finalizarPedido();
});

Entao ("deve ser exibida a mensagem de erro do campo {string}", (nomeCampo) => {
    CheckoutPage.validarErroDoCampo(nomeCampo);
});
