# Nest

Repositório de estudos de [NestJS](https://nestjs.com/). O objetivo aqui é aprender o framework na prática, então o código é de aprendizado e não de produção.

## Projetos

Cada pasta é um projeto Nest independente, com seu próprio `package.json`.

| Pasta | O que é |
| --- | --- |
| [`conceitos_nest`](./conceitos_nest) | Primeiros passos: módulos, controllers e services, criados tanto na mão quanto pelo Nest CLI. |
| [`crud`](./crud) | API REST de recados entre pessoas, com TypeORM + PostgreSQL, validação de DTOs, relações entre entidades e paginação. |

## Como rodar

Entre na pasta do projeto que quiser e rode:

```bash
npm install
npm run start:dev
```

A API sobe em `http://localhost:3000`.

O projeto `crud` precisa de um PostgreSQL rodando em `localhost:5432` com usuário, senha e banco `postgres`. Com Docker:

```bash
docker run --name nest-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Cada projeto tem um arquivo `client.rest` com requisições de exemplo, que podem ser executadas pela extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) do VS Code.
