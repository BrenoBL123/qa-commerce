# language: pt
Funcionalidade: Login
  Como cliente cadastrado da loja QA Commerce
  Quero acessar minha conta
  Para acompanhar meus pedidos e dados cadastrais

  Contexto:
    Dado que o cliente está na página de login

  @login @regressao @smoke
  Cenário: Login com credenciais válidas
    Quando o cliente faz login com e-mail e senha válidos
    Então o cliente deve ser direcionado para a área logada
    E deve ser exibida a identificação do cliente logado