# language: pt
Funcionalidade: Adicionar produto ao carrinho
  Como cliente da loja QA Commerce
  Quero adicionar produtos ao carrinho
  Para que eu possa comprá-los depois

  Contexto:
    Dado que o cliente está na página inicial da loja

  @carrinho @smoke
  Cenário: Adicionar um produto ao carrinho
    Quando o cliente adiciona um produto ao carrinho
    Então o produto deve ser exibido no carrinho
    E o carrinho deve exibir o nome, o preço e a quantidade do produto
    E o valor total do carrinho deve corresponder ao preço do produto

  @carrinho
  Cenário: Adicionar mais de uma unidade do mesmo produto
    Quando o cliente adiciona 2 unidades de um produto ao carrinho
    Então o carrinho deve exibir a quantidade 2 para o produto
    E o valor total do carrinho deve ser o preço do produto multiplicado pela quantidade

  @carrinho
  Cenário: Adicionar produtos diferentes ao carrinho
    Quando o cliente adiciona dois produtos diferentes ao carrinho
    Então os dois produtos devem ser exibidos no carrinho
    E o valor total do carrinho deve ser a soma dos preços dos produtos

  @carrinho
  Cenário: Indicador de quantidade de itens no carrinho
    Quando o cliente adiciona um produto ao carrinho
    Então o indicador do carrinho deve mostrar 1 item
