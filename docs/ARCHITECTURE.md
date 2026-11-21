# Architecture

Decisions behind this layout are in the project decision log (D01–D04). This file is the
working agreement for the code; change it in the same PR as the code it describes.

## Shape

```
apps/web  ──HTTP (Bearer Supabase token)──▶  apps/api  ──Prisma──▶  Postgres (Supabase)
   │                                            │
   └── Supabase Auth (sign-in UI)               └── Stripe (PaymentProvider adapter)
          packages/shared  ◀── imported by both (money, locales, statuses)
```

- **The API is the authority** for prices, totals, stock, quote acceptance and payment state.
  The web app displays what the API returns and never computes a payable amount itself.
- **Auth:** users sign in with Supabase Auth in the web app. The API verifies the access token
  against Supabase's JWKS (`AuthGuard`, global). Routes are private unless marked `@Public()`.
  Staff routes use `@Roles('STAFF', 'ADMIN')`; roles come from our `User` table, never the client.

## Feature modules

Each module lives in `apps/api/src/modules/<name>` with a matching area in `apps/web`.
One owner per module; shared contracts (money, statuses, quote, address) are reviewed together.

| Module        | Scope                                                     | Web routes                                             | Spec   |
| ------------- | --------------------------------------------------------- | ------------------------------------------------------ | ------ |
| users         | Profile, addresses, roles                                 | `/account/*`                                           | §2     |
| catalog       | Categories, products, variants, stock                     | `/shop`, `/category`, `/product`, `/admin/catalog`     | S2, S9 |
| cart          | Account cart, guest-cart merge                            | `/cart`                                                | S5     |
| checkout      | Ordinary checkout attempts (idempotent)                   | `/checkout`                                            | S5     |
| orders        | Orders, receipts, F09 add-ons                             | `/account/orders`, `/admin/orders`                     | §4     |
| payments      | `PaymentProvider` port, Stripe adapter, webhooks, refunds | —                                                      | §7     |
| conversations | Threads + versioned quotes for F01/F05/F06/F07            | `/account/conversations`, `/admin/inbox`               | S4, S8 |
| boards        | Mix & Match boards                                        | `/mix-match`                                           | S3     |
| campaigns     | Group buy                                                 | `/buy-together`                                        | S6     |
| gifts         | Gift links, claims, gift balance                          | `/gifts`, `/gift/[token]`                              | S7     |
| returns       | Returns + refunds                                         | `/account/returns`, `/admin/returns`, `/admin/refunds` | §3     |

Suggested split from spec §8 — **Developer A:** customer shell, catalog, boards, localization.
**Developer B:** account/checkout, conversations/quotes, campaigns, gifts, staff workflows.
Build order: tokens + EN/AR shell → catalog/PDP/cart → account/address/Stripe checkout →
quotes + staff inbox → boards/assisted requests → campaigns/refunds → gifts → order add-ons.

## Rules

**Money** (`packages/shared/src/money.ts`)

- Integer minor units + currency on every amount (`priceMinor: Int`, `currency: Currency`). 1 AED = 100 fils.
- Use the helpers (`parseMajor`, `addMoney`, `formatMoney`); never float math, never assume 2 decimals.
- Prices are stored VAT-inclusive (design assumption, pending sign-off). Stripe minimum: AED 2.00.

**Locale, destination, currency are three separate settings** (spec §7). Locale = UI language only.

**i18n / RTL**

- Every route lives under `app/[locale]`; `<html lang dir>` is set in the root layout.
- Use logical utilities only: `ms-/me-`, `ps-/pe-`, `start-/end-`, `border-s/e`, `text-start`. No `ml-/mr-/left-/right-`.
- Wrap Latin/number fragments inside Arabic text in `<bdi>`. Mirror directional icons only.
- Add every string to `messages/en.json` **and** `messages/ar.json` (keys are type-checked against `en.json`).
  Arabic copy needs review by a fluent speaker before launch.
- Import `Link`/`useRouter` from `@/i18n/navigation`, not from `next/link` / `next/navigation`.

**Status vocabularies** live in `packages/shared/src/status.ts` and mirror Prisma enums.
Request, quote, campaign, payment, fulfillment and refund statuses are separate — never merge them.

**Quotes** (spec §3): immutable versioned snapshots; only the newest, unexpired, payable version can be
accepted; acceptance is an atomic server check; accepted ≠ paid; quote checkout is separate from the cart.

**Payments**: feature code depends on `PAYMENT_PROVIDER` (interface), never on the Stripe SDK.
"Paid" comes from verified webhooks, not from the client. Every create/refund call carries an idempotency key.

**Database**: edit `apps/api/prisma/schema.prisma`, then `pnpm db:migrate --name <change>` and commit
the migration. Timestamps are UTC (`timestamptz`). `User.id` = Supabase auth user id.

## Environments

|     | Local            | Deployed                                                                                                                          |
| --- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Web | `pnpm dev` :3000 | Vercel (root dir `apps/web`)                                                                                                      |
| API | `pnpm dev` :4000 | Render (build `pnpm install && pnpm --filter @eco/api... build`, start `pnpm --filter @eco/api start:prod`, health `/api/health`) |
| DB  | Docker Postgres  | Supabase (`DATABASE_URL` = pooler :6543, `DIRECT_URL` = :5432). Not Render's free Postgres.                                       |
