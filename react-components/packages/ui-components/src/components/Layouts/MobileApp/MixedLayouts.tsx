/* eslint-disable tsdoc/syntax */
// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { TopPaneLayout, BottomPaneLayout } from './PaneLayouts';
import { MiddleBarLayout } from '../Bar/BarLayout';

// ----- TwoPaneBarLayout -----
/**
 * Layout Structure:
 * <>
 *   <TopPane> // height 60%
 *   <MiddleBar> // height 10%
 *   <BottomPane> // height 30%
 * </>
 */
export function TwoPaneBarLayout({ children }: React.PropsWithChildren) {
  if (!children && !Array.isArray(children))
    // REFACTOR: use logger
    // eslint-disable-next-line no-console
    console.error(`${TwoPaneBarLayout.name} expects at least one child`);
  if (!children || !Array.isArray(children)) return null;

  return (
    <div className={clsxCmp(TwoPaneBarLayout.name, 'flex flex-1 flex-col justify-between')}>
      {children[0] ? <TopPaneLayout>{children[0]}</TopPaneLayout> : null}

      {children[1] ? <MiddleBarLayout>{children[1]}</MiddleBarLayout> : null}

      {children[2] ? <BottomPaneLayout>{children[2]}</BottomPaneLayout> : null}
    </div>
  );
}

TwoPaneBarLayout.TopPane = function TopPane({ children }: React.PropsWithChildren) {
  return children;
};

TwoPaneBarLayout.MiddleBar = function Message({ children }: React.PropsWithChildren) {
  return children;
};

TwoPaneBarLayout.BottomPane = function BottomPane({ children }: React.PropsWithChildren) {
  return children;
};
