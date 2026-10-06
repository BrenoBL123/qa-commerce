# language: pt
Funcionalidade: API - Carrinho

  Contexto:
    Dado que o usuário está logado

  @api @carrinho-api
  Cenário: Incluir um produto ao carrinho
    Quando o usuário incluir "<quantidade>" unidades do produto '<produto>' via API
    Então a API deve retornar status 201 e a mensagem de sucesso
    E o carrinho do usuário deve conter o produto com a quantidade informada

    Exemplos:
      | quantidade | produto                     |
      | 2          | Ecobag                      |
      | 5          | Garrafa                     |
      | 5          | Moletom com capuz "Se voc   |
      | 5          | Moletom com capuz "Na minha |
      | 5          | Moletom "Testar             |
      | 5          | Moletom com capuz "Const    |
