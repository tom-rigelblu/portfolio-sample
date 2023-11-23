// Copyright rigélblu inc. All rights reserved.
import { clsx, clsxCmp } from '@rb/class-helpers';
import { Copy } from '@/rb/ui/components/Base/Copy';
import { t } from '@/rb/ui/locales/en';

export const Location = {
  TopHeader: 'Top Header',
} as const;
export type LocationType = (typeof Location)[keyof typeof Location];

export type Label = {
  className?: string;
  location?: LocationType;
};

export type FeaturePreviewProps = {
  label?: Label;
  className?: string;
};

export function FeaturePreview({
  label = {},
  className = '',
  children,
}: React.PropsWithChildren<FeaturePreviewProps>) {
  const { className: labelClass = '', location = Location.TopHeader }: Label = label;

  const labelCss: Record<LocationType, string> = {
    [Location.TopHeader]: '',
    // FEAT:
    // 'top-left-rotated': 'absolute z-10 origin-top translate-y-4 -rotate-12',
  };

  return (
    <div
      className={clsxCmp(
        FeaturePreview.name,
        'flex h-min flex-col outline-dashed outline-orange-400',
        // FEAT:
        // 'static z-0 flex flex-col outline-dashed outline-orange-400',
        className
      )}
    >
      <div className={clsx('bg-orange-400 text-xs font-bold', labelCss[location], labelClass)}>
        <Copy>{t.custom.preview}</Copy>
      </div>
      <div className='h-min'>{children}</div>
    </div>
  );
}
