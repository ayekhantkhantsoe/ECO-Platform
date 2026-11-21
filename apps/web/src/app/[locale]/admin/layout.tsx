import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { SkipLink } from '@/components/layout/skip-link';

/**
 * Staff shell (spec §2 "Admin sitemap"). Separate from the customer shell.
 * TODO(auth): require a STAFF/ADMIN session here and redirect others; the API must
 * enforce permissions on every /admin endpoint regardless of what the UI hides.
 */
export default function AdminLayout({
  children,
}: LayoutProps<'/[locale]/admin'>) {
  return (
    <>
      <SkipLink />
      <div className="flex min-h-dvh">
        <AdminSidebar />
        <main id="main" className="flex-1 px-4 py-6 md:px-6 lg:px-10">
          {children}
        </main>
      </div>
    </>
  );
}
