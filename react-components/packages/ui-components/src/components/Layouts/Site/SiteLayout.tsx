// Copyright 2023 rigélblu inc. All rights reserved.
import { clsx, clsxCmp, cmpCls } from '@rb/class-helpers';
import { MainLayout, Layout } from '../MainLayout';

type Props = {
  children: React.ReactNode;
};

// ----- SiteLayout -----
export function SiteLayout({ children }: Props) {
  return (
    <div className={cmpCls(SiteLayout.name)}>
      <CustomSiteLayout containerClassName='flex flex-col'>{children}</CustomSiteLayout>
    </div>
  );
}

// ----- SiteFullScreenLayout -----
export function SiteFullScreenLayout({ children }: Props) {
  return (
    <div className={cmpCls(SiteLayout.name)}>
      <CustomSiteLayout
        containerClassName='h-screen flex flex-col mx-auto max-w-4xl'
        mainClassName='flex flex-1 flex-col items-center justify-center'
      >
        {children}
      </CustomSiteLayout>
    </div>
  );
}

// ----- Internal API -----
type CustomSiteViewProps = {
  children: React.ReactNode;
  canvasClassName?: string;
  containerClassName?: string; // Container for header, footer, and main
  mainClassName?: string;
  className?: string;
};

// RFACTOR: move to layout
function CustomSiteLayout({
  children,
  canvasClassName = '',
  containerClassName = '',
  mainClassName = '',
  className = '',
}: CustomSiteViewProps) {
  return (
    <MainLayout
      layoutType={Layout.Site}
      canvasClassName={clsx(canvasClassName, 'bg-ivory-100 mgn-site-layout')}
      containerClassName={clsx(containerClassName, 'mx-auto max-w-4xl')}
      mainClassName={clsx(mainClassName, 'm-lay-mbl')}
      className={clsxCmp(CustomSiteLayout.name, className)}
    >
      {children}
    </MainLayout>
  );
}
