import { textDirection } from '@eco/shared';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import '../globals.css';

// Self-hosted variable fonts (src/fonts, SIL Open Font License) so builds never depend on
// reaching Google Fonts. Spec §1: Noto Sans for Latin, Noto Sans Arabic for Arabic.
const notoSans = localFont({
  src: '../../fonts/noto-sans-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-noto-sans',
  display: 'swap',
});

const notoArabic = localFont({
  src: '../../fonts/noto-sans-arabic-arabic-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-noto-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('common');
  return {
    title: {
      default: `${t('brand')} — ${t('tagline')}`,
      template: `%s · ${t('brand')}`,
    },
    description: t('tagline'),
  };
}

/** Root layout: sets lang + dir on <html> so every child can rely on logical (start/end) CSS. */
export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale}
      dir={textDirection(locale)}
      className={`${notoSans.variable} ${notoArabic.variable}`}
    >
      <body className="min-h-dvh">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
