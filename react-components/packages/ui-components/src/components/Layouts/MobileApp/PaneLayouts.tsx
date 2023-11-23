// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { useRecoilValue } from 'recoil';
import { topPaneClassNameAtom, bottomPaneClassNameAtom } from './state';

// ----- TopPaneLayout -----
type TopPaneLayoutProps = {
  // heightPercent?: number;
  className?: string;
};

export function TopPaneLayout({
  // heightPercent,
  className = '',
  children,
}: React.PropsWithChildren<TopPaneLayoutProps>) {
  const topPaneClassName = useRecoilValue(topPaneClassNameAtom);

  return (
    <div
      className={clsxCmp(
        TopPaneLayout.name,
        // HACK: have to use fixed rem for height due to mobile browsers
        // FIXME: max-h isn't applied on iOS mobile safari */}
        'flex flex-1 flex-col justify-start overflow-y-auto',
        // FIXME: use props
        topPaneClassName || 'iphone-se-max-h:max-h-[57%] max-h-[60%]',
        className
      )}
    >
      {children}
    </div>
  );
}

// ----- BottomPaneLayout -----
type BottomPaneLayoutProps = {
  // heightPercent?: number;
  className?: string;
};

export function BottomPaneLayout({
  // heightPercent,
  children,
  className = '',
}: React.PropsWithChildren<BottomPaneLayoutProps>) {
  const bottomPaneClassName = useRecoilValue(bottomPaneClassNameAtom);

  return (
    <div
      className={clsxCmp(
        BottomPaneLayout.name,
        'flex flex-1 flex-col',
        // FIXME: use props
        bottomPaneClassName || 'max-h-[30%]',
        className
      )}
    >
      {children}
    </div>
  );
}
