# ECO Platform

General online store for the UAE (AED), built international-ready from day one: English + Arabic (RTL), multi-currency-ready money, international addresses, WCAG 2.2 AA.

Monorepo: **pnpm workspaces + Turborepo**.

| Path              | What                                                        | Stack                                                                   | Deploys to |
| ----------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- | ---------- |
| `apps/web`        | Customer store + staff admin                                | Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui, next-intl | Vercel     |
| `apps/api`        | REST API (`/api/*`)                                         | NestJS 12 (ESM), Prisma 7, Zod                                          | Render     |
| `packages/shared` | Contracts used by both: money, locales, status vocabularies | TypeScript                                                              | —          |
| `docs/`           | Architecture notes + design handoff                         |                                                                         |            |

Database/Auth/Storage: **Supabase**. Payments: **Stripe** (behind a provider adapter).

## Getting started

Requirements: Node 22+ (`.nvmrc`), Docker (for the local database).

```bash
corepack enable              # gives you the pnpm version pinned in package.json
pnpm install

cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

pnpm db:up                   # start Postgres in Docker
pnpm db:migrate --name init  # first time only: creates prisma/migrations
pnpm --filter @eco/api db:seed

pnpm dev                     # web → http://localhost:3000  ·  api → http://localhost:4000/api/health
```

## Everyday commands

| Command                                             | Does                                                                     |
| --------------------------------------------------- | ------------------------------------------------------------------------ |
| `pnpm dev`                                          | Run web + api + shared (watch) together                                  |
| `pnpm build`                                        | Build everything (Turborepo caches unchanged packages)                   |
| `pnpm lint` / `pnpm typecheck` / `pnpm test`        | Same checks CI runs                                                      |
| `pnpm format`                                       | Prettier on the whole repo                                               |
| `pnpm db:migrate --name <change>`                   | Create + apply a migration after editing `apps/api/prisma/schema.prisma` |
| `pnpm db:studio`                                    | Browse the database                                                      |
| `pnpm --filter @eco/web dlx shadcn add <component>` | Add a shadcn/ui primitive to the web app                                 |

## Read next

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — module map, ownership, rules (money, i18n, quotes, auth)
- [`docs/design/ECO-UI-UX-Specification.md`](docs/design/ECO-UI-UX-Specification.md) — the UI/UX handoff (screens S1–S9)
