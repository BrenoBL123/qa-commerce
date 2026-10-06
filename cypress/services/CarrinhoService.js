class CarrinhoService {

    mensagens = {
        produtoAdicionado: "Produto adicionado ao carrinho com sucesso.",
    };

    limparCarrinho(userId) {
        cy.log(`Limpando o carrinho do usuário ${userId}`);
        return cy.request("POST", "/api/limpar-carrinho", { userId: Number(userId) });
    }

    buscarProdutoPorNome(nome) {
        return cy.request("GET", "/api/produtos?limit=100").then(({ body }) => {
            const produto = body.products.find((p) => p.name.toLowerCase().includes(nome.toLowerCase()));
            expect(produto, `produto "${nome}"`).to.exist;
            return produto;
        });
    }

    adicionarProduto(userId, productId, quantity) {
        return cy.request({
            method: "POST",
            url: "/api/carrinho",
            body: { userId, productId, quantity },
            failOnStatusCode: false,
        });
    }

    listarCarrinho(userId) {
        return cy.request("GET", `/api/carrinho/${userId}`);
    }

    incluirProdutoPorNome(userId, nomeProduto, quantidade) {
        cy.log(`Incluindo ${quantidade} unidade(s) do produto "${nomeProduto}" no carrinho do usuário ${userId}`);
        return this.buscarProdutoPorNome(nomeProduto).then((produto) => {
            return this.adicionarProduto(Number(userId), produto.id, Number(quantidade)).then((response) => ({
                produto,
                quantidade: Number(quantidade),
                response,
            }));
        });
    }

    validarInclusaoComSucesso(response) {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq(this.mensagens.produtoAdicionado);
        expect(response.body.id).to.be.a("number");
    }

    validarProdutoNoCarrinho(userId, produto, quantidade) {
        return this.listarCarrinho(userId).then(({ status, body }) => {
            expect(status).to.eq(200);
            const item = body.find((i) => i.productId === produto.id);
            expect(item, `produto "${produto.name}" no carrinho`).to.exist;
            expect(item.name).to.eq(produto.name);
            expect(item.quantity).to.eq(quantidade);
            expect(item.price).to.eq(produto.price);
        });
    }
}

export default new CarrinhoService();
