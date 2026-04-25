# Fronton Backend — v0.2

O Fronton Backend é uma API robusta construída em Node.js e TypeScript, responsável pelo processamento, filtragem e normalização de feeds RSS de múltiplos portais. A versão v0.2 introduz um sistema de categorização inteligente, filtros de segurança de conteúdo e uma arquitetura de dados otimizada com Prisma.

## Status

- Versão: v0.2 (Beta)
- Objetivo: Implementar categorização de notícias, filtragem de conteúdo sensível e persistência de preferências de usuário.

## Versões anteriores

- **v0.1**: Estrutura base com Express, integração inicial com RSS Parser e suporte a TypeScript.

## Principais Funcionalidades (Análise Técnica)

### 1. Processamento e Sanitização de Dados

- **Extração de Mídia (`extractInfo.ts`)**: Implementação de lógica via Regex para extrair URLs de imagens e links originais embutidos no conteúdo HTML dos feeds, garantindo a limpeza visual do frontend.
- **Filtro de Conteúdo Sensível (`sensitiveContent.ts`)**: Sistema de segurança que valida títulos e descrições contra um dicionário de termos negativos (ex: acidentes, crimes). O objetivo é manter o feed alinhado a uma experiência de leitura limpa e menos tóxica.

### 2. Gestão de Categorias e Feeds

- **Mapeamento de Feeds (`rssFeeds.ts`)**: Centralização da configuração de portais (G1, CNN Brasil, etc.) com metadados específicos, limites de requisição por portal e atribuição de categorias (Política, Geral, etc.).
- **Protocolos de Notícia (`newsProtocol.ts`)**: Definição de tipos rigorosos para a criação de notícias e geração de previews, garantindo a integridade dos dados entre o service e o banco de dados.

### 3. Persistência e Banco de Dados

- **Prisma ORM**: Utilização do PostgreSQL como banco de dados principal. O schema foi atualizado para suportar a relação entre usuários e suas preferências de consumo de notícias.
- **Service Layer (`newsService.ts`)**: Refatoração da lógica de negócio para integrar a validação de sensibilidade e a resolução de categorias antes da persistência no repositório.

## Tecnologias

- Node.js & TypeScript
- Prisma ORM (PostgreSQL)
- RSS Parser (Processamento de feeds)
- Axios (Consumo de APIs externas)
- Dotenv (Gestão de variáveis de ambiente)

## Uso

- **Configuração (`src/config/rssFeeds.ts`)**: Onde são gerenciados os endpoints dos portais e seus respectivos handles.
- **Sanitização (`src/utils/`)**: Utilizado durante o ciclo de processamento para remover links do título e extrair imagens do CDATA dos feeds.
- **Migrações (`prisma/schema.prisma`)**: Define a estrutura da tabela `users` e suas preferências, permitindo a entrega de conteúdo personalizado no futuro.

## Problemas Conhecidos / Limitações

- **Dicionário Sensível**: A filtragem baseada em palavras-chave pode gerar falsos positivos em contextos jornalísticos complexos.
- **Extração de Imagens**: Portais que utilizam carregamento tardio ou formatos proprietários no RSS podem não ter a imagem capturada corretamente pelo Regex.

## Roadmap

- v0.3: Implementação de rotas de autenticação via deviceToken.
- v0.4: Sistema de cache (Redis) para reduzir o tempo de processamento dos feeds.
- v1.0: Endpoints para gerenciamento de favoritos e customização de categorias por usuário.

## Contribuição

Para adicionar novos portais, atualize o arquivo `rssFeeds.ts` seguindo o protocolo `CreateNewsData`.

## Licença

MIT

Desenvolvedor: Marcos Lima
