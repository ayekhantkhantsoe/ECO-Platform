import { z } from 'zod';

/** Validated at boot by ConfigModule — the API refuses to start with bad config. */
export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  WEB_ORIGIN: z.string().default('http://localhost:3000'),
  DATABASE_URL: z.url(),
  SUPABASE_URL: z.union([z.url(), z.literal('')]).default(''),
  STRIPE_SECRET_KEY: z.string().default(''),
  STRIPE_WEBHOOK_SECRET: z.string().default(''),
});

export type Env = z.infer<typeof envSchema>;
