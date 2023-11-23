/* eslint-disable tsdoc/syntax */
/* eslint-disable react/function-component-definition */
// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { type NavBarItemsType } from '@/rb/ui/components/Custom/NavItem/types';
import { AppLayout } from './AppLayout';
import { ContentLayout } from './ContentLayout';
import { TwoPaneBarLayout } from './MixedLayouts';
import { NavBarLayout } from './NavBarLayout';

// ----- TwoPanePlusNavLayout -----
/**
 * Layout View:
 * <TwoPanePlusNavView>
 *   <TwoPanePlusNavView.Content>
 *     <TwoPanePlusNavView.TopPane> // height 60%
 *       // ...
 *     </TwoPanePlusNavView.TopPane>
 *
 *     <TwoPanePlusNavView.MiddleBar> // height 10%
 *       // ...
 *     </TwoPanePlusNavView.MiddleBar>
 *
 *     <TwoPanePlusNavView.BottomPane> // height 30%
 *       // ...
 *     </TwoPanePlusNavView.BottomPane>
 *   </TwoPanePlusNavView.Content>
 *
 *   <TwoPanePlusNavView.Navigation>
 *     // ...
 *   </TwoPanePlusNavView.Navigation>
 * </TwoPanePlusNavView>
 */
type TwoPaneBarLayoutProps = {
  className?: string;
};

export function TwoPaneBarNavLayout({
  children,
  className = '',
}: React.PropsWithChildren<TwoPaneBarLayoutProps>) {
  return <AppLayout className={clsxCmp(TwoPaneBarNavLayout.name, className)}>{children}</AppLayout>;
}

// ----- Content & Navigation -----
TwoPaneBarNavLayout.Content = function Content({ children }: React.PropsWithChildren<object>) {
  return (
    <ContentLayout className={TwoPaneBarNavLayout.Content.name}>
      <TwoPaneBarLayout>{children}</TwoPaneBarLayout>
    </ContentLayout>
  );
};

TwoPaneBarNavLayout.Navigation = function Navigation({ children }: { children: NavBarItemsType }) {
  return <NavBarLayout>{children && Array.isArray(children) ? children : [children]}</NavBarLayout>;
};

// ----- Panes -----
type PaneProps = {
  className?: string;
};
type PaneType = React.FC<React.PropsWithChildren<PaneProps>>;

export const TopPane: PaneType = ({ className = '', children }) => (
  <div className={clsxCmp(TopPane.name, 'flex flex-1', className)}>{children}</div>
);
export const MiddleBar: PaneType = ({ className = '', children }) => (
  <div className={clsxCmp(MiddleBar.name, 'flex flex-1', className)}>{children}</div>
);
export const BottomPane: PaneType = ({ className = '', children }) => (
  <div className={clsxCmp(BottomPane.name, 'flex flex-1', className)}>{children}</div>
);

TwoPaneBarNavLayout.TopPane = TopPane;
TwoPaneBarNavLayout.MiddleBar = MiddleBar;
TwoPaneBarNavLayout.BottomPane = BottomPane;

// ----- FullPaneNavLayout -----
/**
 * Layout View:
 * <TwoPanePlusNavView>
 *   <TwoPanePlusNavView.Content>
 *       // ...
 *   </TwoPanePlusNavView.Content>
 *
 *   <TwoPanePlusNavView.Navigation>
 *     // ...
 *   </TwoPanePlusNavView.Navigation>
 * </TwoPanePlusNavView>
 */
type FullPanNavLayoutProps = {
  className?: string;
};

export function FullPaneNavLayout({
  children,
  className = '',
}: React.PropsWithChildren<FullPanNavLayoutProps>) {
  return <AppLayout className={clsxCmp(TwoPaneBarNavLayout.name, className)}>{children}</AppLayout>;
}

FullPaneNavLayout.Content = function Content({ children }: React.PropsWithChildren<object>) {
  return <ContentLayout>{children}</ContentLayout>;
};
FullPaneNavLayout.Navigation = function Navigation({ children }: { children: NavBarItemsType }) {
  return <NavBarLayout>{Array.isArray(children) ? children : [children]}</NavBarLayout>;
};
