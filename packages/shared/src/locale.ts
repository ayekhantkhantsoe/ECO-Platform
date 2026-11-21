/**
 * Locale = UI language only. Destination country and transaction currency are
 * separate pieces of state (spec §7) — never derive one from another.
 */
export const LOCALES = ['en', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

const RTL_LOCALES: ReadonlySet<Locale> = new Set(['ar']);

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function textDirection(locale: Locale): 'ltr' | 'rtl' {
  return RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
}
