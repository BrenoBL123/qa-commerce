# QA-Commerce

### Loja virtual Geek para simulação de testes + testes Web e API automatizados com Cypress

## Clonando e executando em sua máquina

### Pré-requisito:

-Node.js - Você encontra em: https://nodejs.org/en/
-Visual Studio Code ( ou editor de sua prefrência) - você encontra em: https://code.visualstudio.com/download
-Git: você encontra em: https://git-scm.com/downloads

**Versões utilizadas no projeto:**

Node.js -> **24.19.0**
npm -> **12.2.0**

Versões mais novas do Node.js (como a 26) não funcionam, pois a dependência `jsonwebtoken` usa um recurso (`SlowBuffer`) que foi removido do Node.

Para verificar as versões instaladas, rode no terminal:
```
node -v
npm -v
```

Se o Node.js for diferente de `v24.19.0`, desinstale o atual e instale a versão exata.

**Windows (terminal):**
```
winget uninstall --name Node.js
winget install OpenJS.NodeJS.LTS --version 24.19.0
```

**Pelo site:** baixe o instalador da versão 24.19.0 em https://nodejs.org/dist/v24.19.0/

Depois de instalar o Node.js, atualize o npm para a mesma versão do projeto:
```
npm install -g npm@12.2.0
```

Feche e abra o terminal novamente e confira com `node -v` e `npm -v`.

Via terminal, rode os seguintes comandos:
```  
git clone https://github.com/BrenoBL123/qa-commerce.git
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
`npm run test:web` -> Todos os testes web
`npm run test:web:regressao` -> Suíte de regressão (`@regressao`)
`npm run test:web:smoke` -> Testes essenciais (`@smoke`)
`npm run test:web:login` -> Cenários de login (`@login`)
`npm run test:web:carrinho` -> Cenários de carrinho (`@carrinho`)
`npm run test:web:checkout` -> Cenários de checkout (`@checkout`)
`npm run cy:open` -> Abre a interface do Cypress para executar e depurar os testes visualmente
```

Para ver o navegador durante a execução, adicione `--headed` ao final do comando:
```
npm run test:web:carrinho -- --headed
```

### Testes API

_Em construção. As automações de API serão adicionadas nesta seção._


