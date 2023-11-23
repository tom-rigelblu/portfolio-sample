// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { Copy } from '@/rb/ui/components/Base/Copy';

export type AppTitleProps = {
  title?: string;
  primary?: boolean;
};

// FIXME
export function TitleBarLayout({ title = '', primary = false }: AppTitleProps) {
  return (
    <h2
      className={clsxCmp(
        TitleBarLayout.name,
        'text-2xs text-center',
        primary ? 'text-cta-primary' : 'text-gray-500'
      )}
    >
      <Copy>{title}</Copy>
    </h2>
  );
}
