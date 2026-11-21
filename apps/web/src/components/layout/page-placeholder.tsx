import { useTranslations } from 'next-intl';

import { type PageKey } from '@/lib/messages';

type Props = {
  titleKey: PageKey;
  /** Where this screen is specified, e.g. "S2" or "§2 sitemap" (docs/design/ECO-UI-UX-Specification.md). */
  specRef: string;
};

/** Temporary page body used by the project frame. Replace per screen as features land. */
export function PagePlaceholder({ titleKey, specRef }: Props) {
  const t = useTranslations();
  return (
    <section className="flex flex-col gap-4 py-10 lg:py-16">
      <h1 className="text-[28px] leading-9 font-semibold lg:text-[40px] lg:leading-12">
        {t(`pages.${titleKey}`)}
      </h1>
      <p className="text-muted-foreground">{t('common.placeholder')}</p>
      <p className="w-fit rounded-sm bg-accent px-2 py-1 text-sm text-accent-foreground">
        {t('common.specLabel')}:{' '}
        {/* Isolate Latin refs inside Arabic text (spec §7 bidi). */}
        <bdi dir="ltr">{specRef}</bdi>
      </p>
    </section>
  );
}
