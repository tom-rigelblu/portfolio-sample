// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';

type ContentViewProps = {
  className?: string;
};

export function ContentLayout({
  children,
  className = '',
}: React.PropsWithChildren<ContentViewProps>) {
  return (
    <div
      className={clsxCmp(
        ContentLayout.name,
        'm-lay-mbl flex flex-1 flex-col justify-between',
        className
      )}
    >
      {children}
    </div>
  );
}
