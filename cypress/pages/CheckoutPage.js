import { normalizar } from "../support/utils";

class CheckoutPage {

    elementos = {
        finalizarPedidoButton: () => cy.get(".btn-primary").contains("Finalizar Pedido"),
        alertaGeral: () => cy.get("#alert-container"),
        campo: (id) => cy.get(`#${id}`),
        camposInvalidos: () => cy.get("#checkout-form .is-invalid"),
        mensagensErro: () => cy.get("#checkout-form .invalid-feedback"),
    }

    // id do campo → mensagens esperadas
    errosEsperados = {
        "first-name": ["Este campo é obrigatório."],
        "last-name": ["Este campo é obrigatório."],
        "address": ["Este campo é obrigatório."],
        "number": ["Este campo é obrigatório."],
        "cep": ["Este campo é obrigatório.", "O CEP deve ter 8 caracteres."],
        "email": ["Este campo é obrigatório.", "Por favor, insira um email válido."],
        "terms": ["Este campo é obrigatório."],
        "card-number": ["Este campo é obrigatório."],
        "card-expiry": ["Este campo é obrigatório."],
        "card-cvc": ["Este campo é obrigatório."],
    }

    // nome do campo na feature → id no formulário e valor válido para preenchimento
    camposObrigatorios = {
        "nome": { id: "first-name", valor: "Maria" },
        "sobrenome": { id: "last-name", valor: "Silva" },
        "endereco": { id: "address", valor: "Rua dos Testes" },
        "numero": { id: "number", valor: "123" },
        "cep": { id: "cep", valor: "12345678" },
        "email": { id: "email", valor: "maria.silva@teste.com" },
        "termos": { id: "terms" },
    }

    // campos que só existem quando o meio de pagamento é Cartão de Crédito
    camposCartao = {
        "numero do cartao": { id: "card-number", valor: "4111111111111111" },
        "validade": { id: "card-expiry", valor: "12/30" },
        "cvc": { id: "card-cvc", valor: "123" },
    }

    meiosPagamento = {
        "cartao de credito": "payment-card",
        "boleto": "payment-boleto",
        "pix": "payment-pix",
    }

    acessarCheckout() {
        cy.visit("/checkout.html");
    }

    finalizarPedido() {
        this.elementos.finalizarPedidoButton().click();
    }

    validarTodosOsErrosObrigatorios() {
        Object.entries(this.errosEsperados)
            .filter(([id]) => !id.startsWith("card-"))
            .forEach(([id, mensagens]) => {
                this.elementos.campo(id).should("have.class", "is-invalid");

                this.elementos.campo(id)
                    .parent()
                    .find(".invalid-feedback")
                    .then(($msgs) => {
                        const textos = [...$msgs].map((el) => el.innerText.trim());
                        expect(textos, `mensagens do campo #${id}`).to.deep.equal(mensagens);
                        cy.log(`Campo #${id} possui as mensagens de erro esperadas: ${mensagens.join(", ")}`);
                    });
            });

        // garante que não apareceu nenhum erro a mais ou a menos
        this.elementos.camposInvalidos().should("have.length", 7);

        this.elementos.alertaGeral()
            .should("be.visible")
            .and("contain.text", "Por favor, preencha todos os campos obrigatório marcados com asteriscos!");
    }

    validarPermaneceuCheckout() {
        cy.url().should("include", "/checkout.html");
    }

    verificarPagamentoComCartao(meioPagamento) {
        return normalizar(meioPagamento) === "cartao de credito";
    }

    obterCampo(nomeCampo) {
        const chave = normalizar(nomeCampo);
        const campo = this.camposObrigatorios[chave] || this.camposCartao[chave];
        if (!campo) {
            const validos = [...Object.keys(this.camposObrigatorios), ...Object.keys(this.camposCartao)];
            throw new Error(`Campo "${nomeCampo}" não existe no checkout. Use: ${validos.join(", ")}`);
        }
        return campo;
    }

    preencherCamposObrigatoriosExceto(nomeCampo) {
        const campoIgnorado = this.obterCampo(nomeCampo);

        Object.values(this.camposObrigatorios)
            .filter((campo) => campo.id !== campoIgnorado.id)
            .forEach((campo) => {
                if (campo.id === "terms") {
                    this.elementos.campo(campo.id).check();
                } else {
                    this.elementos.campo(campo.id).clear().type(campo.valor);
                }
            });

        cy.log(`Campos obrigatórios preenchidos, exceto "${nomeCampo}"`);
    }

    escolherMeioPagamento(meioPagamento) {
        const id = this.meiosPagamento[normalizar(meioPagamento)];
        if (!id) {
            throw new Error(`Meio de pagamento "${meioPagamento}" não existe. Use: ${Object.keys(this.meiosPagamento).join(", ")}`);
        }
        this.elementos.campo(id).check();
    }

    preencherDadosCartaoExceto(nomeCampo) {
        const idIgnorado = nomeCampo ? this.obterCampo(nomeCampo).id : null;

        Object.values(this.camposCartao)
            .filter((campo) => campo.id !== idIgnorado)
            .forEach((campo) => {
                this.elementos.campo(campo.id).should("be.visible").clear().type(campo.valor);
            });
    }

    validarErroDoCampo(nomeCampo) {
        const { id } = this.obterCampo(nomeCampo);
        const mensagens = this.errosEsperados[id];

        this.elementos.campo(id).should("have.class", "is-invalid");

        this.elementos.campo(id)
            .parent()
            .find(".invalid-feedback")
            .then(($msgs) => {
                const textos = [...$msgs].map((el) => el.innerText.trim());
                expect(textos, `mensagens do campo #${id}`).to.deep.equal(mensagens);
                cy.log(`Campo #${id} possui as mensagens de erro esperadas: ${mensagens.join(", ")}`);
            });

        // somente o campo não preenchido pode estar com erro
        this.elementos.camposInvalidos().should("have.length", 1);
    }

}

export default new CheckoutPage();