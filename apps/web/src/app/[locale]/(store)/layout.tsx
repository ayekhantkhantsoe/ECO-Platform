import { BottomNav } from '@/components/layout/bottom-nav';
import { SiteHeader } from '@/components/layout/site-header';
import { SkipLink } from '@/components/layout/skip-link';

/** Customer shell: header + mobile bottom navigation (spec §1 "Responsive shell"). */
export default function StoreLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main
        id="main"
        className="mx-auto w-full max-w-7xl px-4 pb-24 md:px-6 lg:px-10 lg:pb-16"
      >
        {children}
      </main>
      <BottomNav />
    </>
  );
}
