# language: pt
Funcionalidade: Validação de campos obrigatórios no checkout
  Como cliente da loja QA Commerce
  Quero ser avisado quando faltar alguma informação obrigatória
  Para corrigir os dados antes de finalizar a compra

  Contexto:
    Dado que o cliente possui um produto no carrinho
    E está na página de checkout

  @checkout @validacao
  Cenário: Tentar finalizar o checkout sem preencher nenhum campo
    Quando o cliente tenta confirmar o pedido sem preencher os campos obrigatórios
    Então deve ser exibida uma mensagem de erro para cada campo obrigatório
    E o pedido não deve ser finalizado

  @checkout @validacao
  Esquema do Cenário: Tentar finalizar o checkout sem preencher o campo <campo>
    Quando o cliente preenche todos os campos obrigatórios, exceto "<campo>"
    E escolhe um método de pagamento
    E tenta confirmar o pedido
    Então deve ser exibida a mensagem de erro do campo "<campo>"
    E o pedido não deve ser finalizado

    Exemplos:
      | campo     |
      | Nome      |
      | Sobrenome |
      | Endereço  |
      | Número    |
      | Cidade    |
      | Estado    |
      | CEP       |
      | Telefone  |
      | E-mail    |

  @checkout @validacao
  Cenário: Tentar finalizar o checkout sem escolher método de pagamento
    Quando o cliente preenche todos os campos obrigatórios com dados válidos
    E tenta confirmar o pedido sem escolher um método de pagamento
    Então deve ser exibida a mensagem de erro de método de pagamento
    E o pedido não deve ser finalizado

  @checkout @validacao
  Cenário: Mensagem de erro some após corrigir o campo
    Dado que o cliente tentou confirmar o pedido sem preencher os campos obrigatórios
    Quando o cliente preenche todos os campos obrigatórios com dados válidos
    Então as mensagens de erro não devem mais ser exibidas
