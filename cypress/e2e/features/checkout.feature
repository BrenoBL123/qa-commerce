# language: pt
Funcionalidade: Checkout simples
  Como cliente da loja QA Commerce
  Quero finalizar minha compra
  Para receber os produtos que escolhi

  Contexto:
    Dado que o cliente possui um produto no carrinho
    E está na página de checkout

  @checkout @smoke
  Esquema do Cenário: Finalizar compra com sucesso usando <metodo>
    Quando o cliente preenche todos os campos obrigatórios com dados válidos
    E escolhe o método de pagamento "<metodo>"
    E confirma o pedido
    Então deve ser exibida a mensagem de sucesso do pedido

    Exemplos:
      | metodo            |
      | Boleto            |
      | Pix               |
      | Cartão de Crédito |

  @checkout
  Cenário: Resumo do pedido exibido no checkout
    Então o resumo do pedido deve exibir os produtos do carrinho
    E o valor total do pedido deve corresponder ao valor total do carrinho

  @checkout
  Cenário: Carrinho é esvaziado após a compra
    Quando o cliente finaliza a compra com dados válidos
    Então o carrinho deve ficar vazio
