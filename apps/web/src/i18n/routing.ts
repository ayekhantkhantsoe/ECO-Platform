import { DEFAULT_LOCALE, LOCALES } from '@eco/shared';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // Always show the locale in the URL (/en/shop, /ar/shop) so links are shareable per language.
  localePrefix: 'always',
});
