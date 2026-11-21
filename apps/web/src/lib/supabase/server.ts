import 'server-only';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { publicEnv } from '@/lib/env';

/**
 * Supabase client for Server Components / Server Actions. Reads the session from cookies.
 * TODO(auth): add session refresh to src/proxy.ts (chain with the next-intl middleware)
 * when sign-in is implemented.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    publicEnv.supabaseUrl,
    publicEnv.supabasePublishableKey,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component: cookies are read-only there; the proxy refreshes them.
          }
        },
      },
    },
  );
}
