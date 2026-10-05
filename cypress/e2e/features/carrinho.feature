# language: pt
Funcionalidade: Adicionar produto ao carrinho
  Como cliente da loja QA Commerce
  Quero adicionar produtos ao carrinho
  Para que eu possa comprá-los depois

  Contexto:
    Dado que o cliente está na página inicial da loja

  @carrinho @regressao
  Cenário: Adicionar um produto ao carrinho
    Quando o cliente adiciona "<quantidade>" vezes o produto "<produto>" no carrinho
    Então o produto deve ser exibido no carrinho
    E o carrinho deve exibir o nome, a quantidade do produto e os preços
    E o valor total do carrinho deve corresponder à soma de preço dos produtos

    Exemplos:
      | quantidade | produto           |
      | 4          | Moletom com capuz |
      | 10         | Ecobag            |
      | 7          | Garrafa           |
