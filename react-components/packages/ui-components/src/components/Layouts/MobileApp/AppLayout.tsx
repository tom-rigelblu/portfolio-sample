// Copyright 2023 rigélblu inc. All rights reserved.
// FIXME: use @ imports
import { clsxCmp } from '@rb/class-helpers';
import { Layout, MainLayout } from '../MainLayout';

/**
 * Usage: full screen mobile app layout
 *
 * <AppLayout>
 *   // Next other Layouts
 * </AppLayout>
 *
 * Example:
 * <AppLayout>
 *   <FullPanleNavLayout>
 *     // ...
 *   <FullPanleNavLayout>
 * </AppLayout>
 */

// ----- AppView -----
type Props = {
  className?: string;
};

// RFACTOR: move to layout
export function AppLayout({ children, className = '' }: React.PropsWithChildren<Props>) {
  return (
    <MainLayout
      canvasClassName='bg-black mgn-app-layout'
      containerClassName='mx-auto max-w-4xl'
      mainClassName='flex h-screen flex-col items-center justify-center bg-neutral-950'
      className={clsxCmp(AppLayout.name, className)}
      layoutType={Layout.App}
    >
      {/* HACK: Using fixed rem for max height and width due to mobile browsers. Future improvements could include responsive design adjustments. */}
      <div
        className={clsxCmp(
          `${AppLayout.name}-mobile`,
          'bg-ivory-100 flex max-h-[48rem] w-full flex-1 flex-col justify-between sm:max-w-[25rem]'
        )}
      >
        {children}
      </div>
    </MainLayout>
  );
}
