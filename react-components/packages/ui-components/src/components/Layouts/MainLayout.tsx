// Copyright 2023 rigélblu inc. All rights reserved.
// FIXME: use @ imports
import { clsxCmp } from '@rb/class-helpers';
import { useEffect, useState } from 'react';
import { Copy } from '@/rb/ui/components/Base/Copy';
import { Link } from '@/rb/ui/components/Base/Link';
import { Header } from './Site/HeaderLayout';
import { Footer } from './Site/FooterLayout';

export const Layout = {
  App: 'app',
  Site: 'site',
} as const;
export type LayoutType = (typeof Layout)[keyof typeof Layout];

export type MainLayoutProps = {
  children: React.ReactNode;
  canvasClassName?: string;
  containerClassName?: string; // Container for header, footer, and main
  mainClassName?: string;
  layoutType: LayoutType;
  className?: string;
};

export function MainLayout(props: MainLayoutProps) {
  const {
    children,
    canvasClassName = '',
    containerClassName = '',
    mainClassName = '',
    layoutType,
    className = '',
  } = props;

  // OPTIIMIZE: enable this only on mobile safari
  // Trigger mobile safari to rerender when the nav bar disappears
  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowHeight]);

  return (
    <div className={clsxCmp(MainLayout.name, canvasClassName, className)}>
      <div className={clsxCmp(`${MainLayout.name}-container`, containerClassName)}>
        {layoutType === Layout.Site && (
          <Header>
            <Link href='/' className='text-sm'>
              <Copy primaryCTA bold>
                {/* REFACTOR: {t.general.magin} */}
                magin
                <span className='text-2xs block font-normal'>
                  bringing stories to life
                  {
                    // REFACTOR: t.general.tagline
                  }
                </span>
              </Copy>
            </Link>
          </Header>
        )}
        <main className={clsxCmp(`${MainLayout.name}-main`, mainClassName)}>{children}</main>
        {layoutType === Layout.Site && <Footer />}
      </div>
    </div>
  );
}
