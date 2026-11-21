import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

const GROUPS = [
  { key: 'assistance', links: [{ href: '/admin/inbox', page: 'adminInbox' }] },
  {
    key: 'commerce',
    links: [
      { href: '/admin/catalog', page: 'adminCatalog' },
      { href: '/admin/orders', page: 'adminOrders' },
      { href: '/admin/campaigns', page: 'adminCampaigns' },
      { href: '/admin/gifts', page: 'adminGifts' },
    ],
  },
  {
    key: 'operations',
    links: [
      { href: '/admin/returns', page: 'adminReturns' },
      { href: '/admin/refunds', page: 'adminRefunds' },
      { href: '/admin/customers', page: 'adminCustomers' },
    ],
  },
  {
    key: 'settings',
    links: [
      { href: '/admin/settings', page: 'adminSettings' },
      { href: '/admin/audit', page: 'adminAudit' },
    ],
  },
] as const;

/** 240px desktop sidebar (spec §2). TODO: mobile navigation drawer + inbox count + staff identity. */
export function AdminSidebar() {
  const t = useTranslations();
  return (
    <nav
      aria-label={t('nav.staff')}
      className="hidden w-60 shrink-0 border-e bg-card p-4 lg:block"
    >
      <Link href="/admin" className="mb-6 block text-lg font-semibold">
        {t('common.brand')} · {t('nav.staff')}
      </Link>
      {GROUPS.map((group) => (
        <div key={group.key} className="mb-6">
          <p className="mb-2 text-sm text-muted-foreground">
            {t(`nav.${group.key}`)}
          </p>
          <ul className="flex flex-col gap-1">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted"
                >
                  {t(`pages.${link.page}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link
        href="/"
        className="text-sm text-primary underline-offset-4 hover:underline"
      >
        {t('nav.backToStore')}
      </Link>
    </nav>
  );
}
