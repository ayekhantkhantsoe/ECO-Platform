'use client';

import { Home, Store, User, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const ITEMS = [
  { href: '/', key: 'home', Icon: Home },
  { href: '/shop', key: 'shop', Icon: Store },
  { href: '/buy-together', key: 'together', Icon: Users },
  { href: '/account', key: 'account', Icon: User },
] as const;

/** Mobile bottom navigation: 4 stable destinations, icon + text (spec §2). Hidden on lg+. */
export function BottomNav() {
  // The active item depends on the URL (runtime data), so it streams in; the
  // prerendered fallback is the same nav without an active marker.
  return (
    <Suspense fallback={<BottomNavView pathname={null} />}>
      <ActiveBottomNav />
    </Suspense>
  );
}

function ActiveBottomNav() {
  return <BottomNavView pathname={usePathname()} />;
}

function BottomNavView({ pathname }: { pathname: string | null }) {
  const t = useTranslations('nav');
  return (
    <nav
      aria-label={t('primary')}
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid h-16 grid-cols-4">
        {ITEMS.map(({ href, key, Icon }) => {
          const active =
            pathname !== null &&
            (href === '/' ? pathname === '/' : pathname.startsWith(href));
          return (
            <li key={key}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-1 text-xs font-semibold',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Icon aria-hidden className="size-6" />
                {t(key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
