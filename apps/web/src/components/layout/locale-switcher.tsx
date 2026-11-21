'use client';

import type { Locale } from '@eco/shared';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LABELS: Record<Locale, string> = { en: 'English', ar: 'العربية' };

/**
 * Language only — country and currency are separate settings (spec §2/§7).
 * Keeps the current route when switching.
 */
export function LocaleSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="sr-only">{t('language')}</span>
      <select
        value={locale}
        disabled={isPending}
        onChange={(event) => {
          const next = event.target.value as Locale;
          startTransition(() => {
            // @ts-expect-error -- params always match the current pathname.
            router.replace({ pathname, params }, { locale: next });
          });
        }}
        className="h-10 rounded-md border border-input bg-card px-3"
      >
        {routing.locales.map((value) => (
          <option key={value} value={value} lang={value}>
            {LABELS[value]}
          </option>
        ))}
      </select>
    </label>
  );
}
