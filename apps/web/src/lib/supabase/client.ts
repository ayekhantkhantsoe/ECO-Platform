import { createBrowserClient } from '@supabase/ssr';

import { publicEnv } from '@/lib/env';

/** Supabase client for Client Components (sign-in/sign-up UI). */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    publicEnv.supabaseUrl,
    publicEnv.supabasePublishableKey,
  );
}
