# Fronton — Backend v0.1

## Resumo

Fronton é uma API para coletar, filtrar e armazenar notícias de múltiplos feeds RSS. Esta é a versão inicial (v0.1) contendo a arquitetura em camadas, ingestão básica de RSS e endpoints para recuperação de notícias.

## Status da versão

- Versão: v0.1
- Estado: protótipo funcional

## Funcionalidades principais

- Coleta de notícias a partir de uma lista de feeds RSS (configuração em src/config/rssFeeds.ts).
- Endpoint GET /news que retorna uma lista de notícias com os campos: title, pubDate, image, portal, link.
- Endpoint GET /health para verificação de disponibilidade.
- Serviço preparado para gerar objetos prontos para persistência (createNews -> DBNewsCreate).
- Camadas separadas: routers, controllers, services, repositories, database.

## API

Base URL (desenvolvimento): http://localhost:3000

Endpoints

- GET /health
  - Descrição: healthcheck simples.
  - Resposta: 200 OK, texto "I'm ok!".

- GET /news
  - Descrição: retorna notícias agregadas do(s) feed(s).
  - Resposta: 200 OK, application/json - array de objetos:

Exemplo de resposta (cada item):

{
"title": "Título da notícia",
"pubDate": "2026-04-18T...Z",
"image": "https://.../image.jpg",
"portal": "G1",
"link": "https://.../noticia"
}

Observação: O campo pubDate pode estar em string ISO; o serviço central possui funções que transformam em Date antes de persistir.

## Modelo de persistência (prisma)

O schema Prisma (prisma/schema.prisma) contém o model News com os campos usados pela aplicação:

model News {
id Int @id @default(autoincrement())
title String
portal String
imageUrl String?
content String
link String @unique
publishedAt DateTime
createdAt DateTime @default(now())
}

Objeto preparado para criação (DBNewsCreate)

- title: string
- portal: string
- imageUrl?: string | null
- content: string
- link: string
- publishedAt: Date

Este é o formato retornado pela função createNews do serviço de notícias; é o payload esperado pelo repositório para salvar no banco.

## Arquitetura e organização

Camadas principais:

- src/routers — definição das rotas (ex.: newsRouter).
- src/controllers — lógica de entrada/saída por rota (ex.: newsController.getNews).
- src/services — orquestração de regras de negócio e integração com fontes externas (ex.: newsService.createNews e refreshNewsService).
- src/repositories — acesso ao banco (Prisma client em src/database). (nota: implementação de persistência pode ser adicionada/estendida)
- src/middlewares — tratamento de erros e validação de schema.
- src/config — configurações (ex.: lista de RSS_FEEDS).

Middlewares

- error-middleware: tratamento centralizado de erros.
- schema-middleware: validação via Joi (utilizado para validação de payloads quando aplicável).

## Instalação e execução

Pré-requisitos:

- Node.js (recomendado 18+)
- PostgreSQL (ou outra fonte compatível conforme DATABASE_URL)

## Considerações sobre desenvolvimento

- O projeto já inclui Prisma e um schema de exemplo. A integração do serviço de ingestão com o repositório (persistência) está preparada em formato de objetos (DBNewsCreate), mas a lógica de salvamento (upsert/createMany e deduplicação) pode ser adicionada no módulo repositories.
- A rota /news atualmente retorna os dados agregados do feed (serviço -> controller -> router). Dependências externas (RSS) podem causar latência; recomenda-se implementar cache e jobs de atualização (refreshNewsService já existe como ponto de partida).

## Limitações e roadmap (próximos passos)

Prioridade imediata para próximas versões:

- Implementar repositório Prisma para salvar notícias com deduplicação (por link) e tratamentos de erro.
- Adicionar paginação e filtros (por portal, data, tags).
- Adicionar testes unitários e de integração para endpoints e serviços.
- Implementar autenticação/controle de acesso para endpoints administrativos (por exemplo endpoints para forçar refresh/import).
- Monitoramento e métricas para jobs de ingestão.

## Contribuição

1. Fork do repositório
2. Branch com feature: git checkout -b feature/descrição
3. Commit e PR com descrição clara do que foi alterado

## Licença

MIT

## Contato

Para dúvidas e sugestões, abra uma issue no repositório ou entre em contato com os mantenedores.
