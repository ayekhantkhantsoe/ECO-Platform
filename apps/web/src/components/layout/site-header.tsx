import { Search, ShoppingBag, User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Suspense } from 'react';

import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { Link } from '@/i18n/navigation';

/** Customer header (spec §2 "Navigation decisions"). 56px mobile, 80px + 44px category row on desktop. */
export function SiteHeader() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 md:px-6 lg:h-20 lg:px-10">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          {tc('brand')}
        </Link>

        <form
          action={`/${locale}/search`}
          role="search"
          className="hidden flex-1 lg:block"
        >
          <label className="relative block max-w-xl">
            <span className="sr-only">{t('search')}</span>
            <Search
              aria-hidden
              className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            />
            <input
              name="q"
              type="search"
              placeholder={t('searchPlaceholder')}
              className="h-12 w-full rounded-md border border-input bg-card ps-11 pe-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
        </form>

        <div className="ms-auto flex items-center gap-1">
          <Link
            href="/search"
            aria-label={t('search')}
            className="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted lg:hidden"
          >
            <Search aria-hidden className="size-5" />
          </Link>
          <div className="hidden lg:block">
            {/* Reads the current URL, so it streams in after the static shell. */}
            <Suspense fallback={<div className="h-10 w-28" />}>
              <LocaleSwitcher />
            </Suspense>
          </div>
          <Link
            href="/account"
            aria-label={t('account')}
            className="hidden size-11 items-center justify-center rounded-md hover:bg-muted lg:inline-flex"
          >
            <User aria-hidden className="size-5" />
          </Link>
          {/* TODO(cart): show quantity badge from the cart (guest cart merges into account cart on sign-in). */}
          <Link
            href="/cart"
            aria-label={t('bag')}
            className="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted"
          >
            <ShoppingBag aria-hidden className="size-5" />
          </Link>
        </div>
      </div>

      <nav aria-label={t('primary')} className="hidden border-t lg:block">
        <ul className="mx-auto flex h-11 max-w-7xl items-center gap-8 px-10 text-sm font-semibold">
          <li>
            <Link href="/shop">{t('shop')}</Link>
          </li>
          <li>
            <Link href="/buy-together">{t('buyTogether')}</Link>
          </li>
          <li>
            <Link href="/gifts">{t('gifts')}</Link>
          </li>
          <li>
            <Link href="/help-me-shop">{t('helpMeShop')}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
