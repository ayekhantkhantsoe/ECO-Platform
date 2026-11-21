import type { Locale } from '@eco/shared';
import type { Messages } from './lib/messages';

// Type-safe translation keys and locales for next-intl.
declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale;
    Messages: Messages;
  }
}
