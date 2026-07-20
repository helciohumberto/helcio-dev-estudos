Pergunta 1: O que é uma API REST e qual a diferença entre GET, POST e DELETE?
  Uma API REST é uma interface que permite que sistemas se comuniquem via HTTP. No meu projeto, construí uma API REST com Express onde o frontend React faz requests para o backend e recebe dados em JSON.

Pergunta 2: O que é JWT e como funciona o fluxo de autenticação?
  JWT é um token gerado pelo servidor após o login. O usuário manda email e senha, o servidor valida, gera um token assinado com uma chave secreta e devolve. O frontend guarda esse token no localStorage e manda em cada requisição no header Authorization: Bearer token. O servidor só precisa verificar a assinatura do token — sem precisar de banco de dados.

Pergunta 3: Qual a diferença entre async/await e .then()?
  O JavaScript é single-threaded e usa um event loop. Com async/await, operações lentas como fetch não bloqueiam o resto do código — o programa continua e volta quando a resposta chegar. O .then() faz a mesma coisa mas com encadeamento de funções. Prefiro async/await porque o código fica mais legível, parecido com código síncrono.

Pergunta 4: O que é o princípio Single Responsibility e como você aplicou no seu projeto?
  Single Responsibility significa que cada função ou classe deve ter um único motivo para existir. No meu projeto, separei a lógica de criar usuário numa função criarUtilizador() que só faz hash da senha e salva — ela não sabe nada sobre HTTP. A rota só recebe os dados e chama essa função. Também criei a função erroCredenciaisInvalidas() para não repetir o mesmo res.status(401) em vários lugares.

Pergunta 5: O que é Docker e para que serve?
  Docker empacota o código junto com todas as dependências e configurações num container. Isso garante que o projeto roda igual em qualquer máquina — na minha, na do colega, no servidor de produção. Sem Docker, muitas vezes o código funciona na minha máquina mas falha no servidor porque as versões são diferentes. No meu projeto, criei um Dockerfile que qualquer pessoa pode usar para rodar o servidor sem precisar instalar Node, dependências, etc.