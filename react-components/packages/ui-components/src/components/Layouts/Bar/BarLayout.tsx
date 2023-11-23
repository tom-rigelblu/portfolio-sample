// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';

type MiddleBarLayoutProps = {
  className?: string;
};

export function MiddleBarLayout({
  children,
  className = '',
}: React.PropsWithChildren<MiddleBarLayoutProps>) {
  return (
    <div
      className={clsxCmp(
        MiddleBarLayout.name,
        'm-lay-mbl flex flex-col items-center justify-center',
        className
      )}
    >
      {children}
    </div>
  );
}
