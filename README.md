# QA-Commerce

### Loja virtual Geek para simulação de testes + testes Web e API automatizados com Cypress

## Clonando e executando em sua máquina

### Pré-requisito:

-Node.js - Você encontra em: https://nodejs.org/en/
-Visual Studio Code ( ou editor de sua prefrência) - você encontra em: https://code.visualstudio.com/download
-Git: você encontra em: https://git-scm.com/downloads

**Observação sobre a versão do Node.js:** o projeto funciona com o **Node.js 24 (LTS)** — testado na versão 24.19.0. 
Versões mais novas (como o Node.js 26) não funcionam, pois a dependência `jsonwebtoken` usa um recurso (`SlowBuffer`) que foi removido do Node. 
Para verificar a versão instalada, rode no terminal:
```
node -v
```
Se aparecer uma versão diferente da 24, desinstale o Node atual e instale a versão LTS pelo site https://nodejs.org/en/ ou, no Windows, via terminal:
```
winget uninstall --name Node.js
winget install OpenJS.NodeJS.LTS
```
Depois feche e abra o terminal novamente e confira com `node -v`.

Via terminal, rode os seguintes comandos:
```  
git clone https://github.com/fabioaraujoqa/qa-commerce.git
```
```
cd qa-commerce
```

#### Para instalar as dependencias:
```
npm install 
```

**Observação:** versões mais novas do npm bloqueiam os scripts de instalação dos pacotes. Os pacotes `sqlite3` e `bcrypt` precisam desses scripts para funcionar (sem eles aparece o erro `Could not locate the bindings file` em `bindings.js`). Eles já estão liberados no `package.json` (campo `allowScripts`), mas, se o erro aparecer, rode:
```
npm install-scripts approve sqlite3 bcrypt
npm rebuild sqlite3 bcrypt
```

#### Para subir o servidor e o banco:
```
npm start
```

No console vai aparecer os endereços do site e do banco. 
O site você acessaem: http://localhost:3000/

A documentação funciona em: http://localhost:3000/api-docs/


#### Para executar os testes automatizados:
```

| Comando | O que executa |
|---|---|
| `npm run test:web` | Todos os testes web |
| `npm run test:web:regressao` | Suíte de regressão (`@regressao`) |
| `npm run test:web:smoke` | Testes essenciais (`@smoke`) |
| `npm run test:web:login` | Cenários de login (`@login`) |
| `npm run test:web:carrinho` | Cenários de carrinho (`@carrinho`) |
| `npm run test:web:checkout` | Cenários de checkout (`@checkout`) |
| `npm run cy:open` | Abre a interface do Cypress para executar e depurar os testes visualmente |

Para ver o navegador durante a execução, adicione `--headed` ao final do comando:
```
npm run test:web:carrinho -- --headed


### Testes API

_Em construção. As automações de API serão adicionadas nesta seção._


