# language: pt
Funcionalidade: Validação de campos obrigatórios no checkout
  Como cliente da loja QA Commerce
  Quero ser avisado quando faltar alguma informação obrigatória
  Para corrigir os dados antes de finalizar a compra

  Contexto:
    Dado que o cliente está na página de checkout

  @checkout @regressao
  Cenário: Tentar finalizar o checkout sem preencher nenhum campo
    Quando o cliente tenta confirmar o pedido sem preencher os campos obrigatórios
    Então deve ser exibida uma mensagem de erro para cada campo obrigatório
    E o pedido não deve ser finalizado

  @checkout @regressao
  Esquema do Cenário: Tentar finalizar o checkout sem preencher o campo <campo>
    Quando o cliente preenche todos os campos obrigatórios, exceto "<campo>"
    E escolhe um método de pagamento "<meio_pagamento>"
    E informações de pagamento
    E tenta confirmar o pedido
    Então deve ser exibida a mensagem de erro do campo "<campo>"
    E o pedido não deve ser finalizado

    Exemplos:
    | meio_pagamento    | campo            |
    | Cartão de Crédito | Nome             |
    | Boleto            | Sobrenome        |
    | Pix               | Endereço         |
    | Cartão de Crédito | Número           |
    | Boleto            | CEP              |
    | Pix               | E-mail           |
    | Boleto            | Termos           |
    | Cartão de Crédito | Número do Cartão |
    | Cartão de Crédito | Validade         |
    | Cartão de Crédito | CVC              |