# SENAIgo — API

Node.js + Express 5 + JWT. Os dados ficam em memória (reiniciar o servidor zera tudo).

```bash
npm install
npm run dev     # ou npm start
```

O `.env` precisa de `PORT`, `CORS_ORIGIN`, `JWT_SECRET` e `ADMIN_EMAILS` (veja `.env.example`).
**Administrador:** cadastre-se com um e-mail listado em `ADMIN_EMAILS` (padrão: `admin@senaigo.com`).

## Rotas

| Método e rota | Acesso | Corpo | Resposta |
|---|---|---|---|
| `POST /cadastrarUsuario` | público | `cpf`, `nome`, `email`, `senha` | 201 `{ sucesso, usuario }` |
| `POST /auth/login` | público | `email`, `senha` | `{ sucesso, usuarioLogin, token }` |
| `GET /salas` | público | – | lista de salas |
| `POST /registrarLocal` | token | `salaId` | 201 `{ sucesso, localDeVisita }` · 404 sala inexistente · 409 já visitada |
| `GET /locais` | público | – | lista de visitas |
| `GET /saldo` | token | – | `{ pontosGanhos, pontosGastos, saldo }` |
| `GET /produtos` | público | – | lista de produtos |
| `GET /produtos/:id` | público | – | produto · 404 |
| `POST /cadastrarProduto` | admin | `nome`, `pontos`, `estoque`, `imagem?` | 201 `{ sucesso, produto }` |
| `PUT /atualizarProduto/:id` | admin | `nome`, `pontos`, `estoque`, `imagem?` | `{ sucesso, produto }` · 404 |
| `DELETE /removerProduto/:id` | admin | – | `{ sucesso, produto }` · 404 |
| `POST /resgatarProduto` | token | `produtoId` | 201 `{ sucesso, resgate, pontosGanhos, pontosGastos, saldo }` · 400 saldo insuficiente · 404 · 409 esgotado |
| `GET /resgates` | token | – | resgates do usuário logado |

Rotas autenticadas usam `Authorization: Bearer <token>`. Erros seguem o padrão `{ "erro": "..." }` ou `{ "erros": ["..."] }`; usuário sem permissão recebe 403.

Exemplo (admin):

```bash
curl -X POST http://localhost:3000/cadastrarProduto \
  -H "Content-Type: application/json" -H "Authorization: Bearer <token>" \
  -d '{"nome":"Adesivo SENAI","imagem":"⭐","pontos":3,"estoque":20}'
```

## Regras da loja

- Saldo = pontos das visitas − pontos dos resgates (calculado em `models/saldoModel.js`).
- O resgate valida produto, estoque e saldo, baixa o estoque e registra o histórico (com cópia do nome e do custo do produto).
- Os pontos de cada visita vêm do cadastro de salas (`models/salasModel.js`), não do cliente.

## Estrutura

`controllers/` · `models/` · `routes/` · `middlewares/` (autenticar, autorizarAdmin, validarSchema, schema, tratarErros, ...).
Novos campos validáveis em `middlewares/schema.js` aceitam `tipo`, `obrigatorio`, `min`/`max` (tamanho), `inteiro`, `minValor`/`maxValor`.

## Trocando a memória pelo banco

Só os arquivos de `src/models/` guardam dados. Os controllers da loja já usam `await` nas chamadas aos models, então, ao reimplementar as funções deles com o banco (retornando Promises e mantendo os mesmos nomes e formatos de retorno), nem as rotas nem o frontend precisam mudar.
