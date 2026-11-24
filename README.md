# Skale Digital

Site institucional da Skale Digital, construído com Nuxt 4, Vue 3 e CSS.

## Publicando artigos no blog

O blog foi desenhado para publicação automatizada sem alterações no layout. Cada artigo é um arquivo JSON em `app/content/blog/`.

Para publicar, crie um arquivo com nome único e siga o schema dos artigos existentes:

```json
{
  "slug": "url-do-artigo",
  "title": "Título",
  "excerpt": "Resumo curto",
  "category": "Categoria",
  "publishedAt": "2026-11-18",
  "readingMinutes": 5,
  "featured": false,
  "draft": false,
  "seoTitle": "Título para busca | Skale Digital",
  "seoDescription": "Descrição para busca",
  "content": [
    { "type": "paragraph", "text": "Texto..." },
    { "type": "heading", "text": "Intertítulo" },
    { "type": "list", "items": ["Item 1", "Item 2"] },
    { "type": "quote", "text": "Destaque" }
  ]
}
```

Arquivos com `"draft": true` não aparecem no site. Depois de adicionar o JSON, basta executar o mesmo fluxo de build/deploy do projeto.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
