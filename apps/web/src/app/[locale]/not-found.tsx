import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('common');
  return (
    <main className="mx-auto flex max-w-xl flex-col items-start gap-6 px-4 py-24">
      <h1 className="text-[28px] leading-9 font-semibold">{t('notFound')}</h1>
      <Button asChild>
        <Link href="/">{t('goHome')}</Link>
      </Button>
    </main>
  );
}
