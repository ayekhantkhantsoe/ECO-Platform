import { SiteHeader } from '@/components/layout/site-header';
import { SkipLink } from '@/components/layout/skip-link';

/**
 * Checkout shell: no bottom navigation. On checkout the sticky action bar replaces it,
 * so two sticky bars never compete (spec §1).
 */
export default function CheckoutLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main
        id="main"
        className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-6 lg:px-10"
      >
        {children}
      </main>
    </>
  );
}
