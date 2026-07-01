# Arquitectura do Projecto

## Stack
**Backend**
- Node.js + Express — servidor HTTP simples e familiar
- TypeScript — tipagem que previne erros antes de rodar o código
- JWT + bcryptjs — autenticação segura com tokens e hash de senhas
- dotenv — variáveis de ambiente para não expor dados sensíveis no código

**Frontend**
- React + Vite — componentes reutilizáveis com build rápido
- TypeScript — mesma vantagem do backend, consistência no projecto
- React Router — navegação entre páginas sem recarregar o browser
- React Hook Form + Zod — formulários com validação declarativa
- Tailwind CSS — estilização rápida com classes utilitárias

**Deploy**
- Railway — backend em produção com variáveis de ambiente
- Vercel — frontend em produção com deploy automático via GitHub

## Princípios aplicados
**Single Responsibility (S do SOLID)**
Separei a lógica de negócio das rotas HTTP. Por exemplo, a função `criarUtilizador()` só faz hash da senha e salva — não sabe nada sobre req/res. A rota só recebe os dados e chama essa função.

**Código Limpo — Eliminar repetição**
Criei a função `erroCredenciaisInvalidas(res)` para evitar repetir o mesmo `res.status(401).json(...)` em 3 lugares diferentes no servidor.

**Código Limpo — Nomes que revelam intenção**
Renomeei variáveis genéricas como `dados` para nomes mais descritivos como `passwordHash`, `utilizador`, `dadosForm`.

**Custom Hook — Reutilização no frontend**
Criei o hook `useFetch<T>()` para encapsular a lógica de busca autenticada, evitando repetir `useState + useEffect + fetch + token` em cada componente.

**AuthContext — Centralização de estado**
Em vez de cada componente acessar `localStorage` diretamente, centralizei a lógica de autenticação num Context, seguindo o princípio de responsabilidade única.

## Decisões técnicas e porquê
**JWT stateless em vez de sessões**
Escolhi JWT porque não precisa de base de dados para verificar autenticação — o token carrega os dados do utilizador e o servidor só precisa da chave secreta para validar. Simples para começar.

**Variáveis de ambiente para segredos**
A chave JWT e a URL da API nunca ficam no código. Ficam no `.env` localmente e configuradas no Railway/Vercel em produção. Aprendi isso na prática quando o TypeScript reclamou que `process.env.JWT_SECRET` podia ser `undefined`.

**vercel.json para SPA routing**
Sem esse arquivo, qualquer rota além de `/` retornava 404 no Vercel. Isso acontece porque o React Router controla rotas via JavaScript, e o servidor precisa saber para sempre devolver o `index.html`.

**useFetch<T>() genérico**
Em vez de repetir a lógica de fetch autenticado em cada componente, criei um hook que recebe a URL e o tipo dos dados esperados. Qualquer nova página protegida pode reutilizar sem reescrever nada.

## O que aprendi

**fetch**
O fetch vai buscar dados numa URL de API. Sem ele, o frontend não consegue se comunicar com o backend.

**async/await**
O async marca uma função que vai ter operações que demoram (como ir buscar dados). O await pausa a execução naquela linha até a resposta chegar, sem travar o resto do programa.

**JWT**
JWT é um token que o servidor gera depois do login. Em vez de verificar email e senha em cada requisição, o cliente manda esse token, e o servidor só precisa validar a assinatura para saber que é legítimo.

**bcrypt**
O bcrypt transforma a senha em hash antes de guardar. Mesmo que alguém roube a base de dados, não consegue ler as senhas originais.