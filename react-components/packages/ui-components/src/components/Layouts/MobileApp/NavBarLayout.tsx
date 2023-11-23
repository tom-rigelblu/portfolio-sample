/* eslint-disable tsdoc/syntax */
// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import React from 'react';
import { type NavBarItemsType } from '@/rb/ui/components/Custom/NavItem/types';

/**
 * Layout Structure:
 * <NavBarLayout>
 *   <NavItem.{CompoundNavItem} />
 *   <NavItem.{CompoundNavItem} />
 *    ...
 *   <NavItem.{CompoundNavItem} />
 * </NavBarLayout>
 */
type Props = {
  children: NavBarItemsType;
  numNavItems?: number; // only needed when nesting more than 1 level deep
  className?: string;
};

export function NavBarLayout({ children, numNavItems, className = '' }: Props) {
  let numElements = 0;

  if (numNavItems) numElements = numNavItems;
  else if (React.isValidElement(children)) numElements = React.Children.count(children);
  else if (Array.isArray(children) && React.isValidElement(children[0])) {
    const element = children[0] as React.ReactElement<{ children?: React.ReactNode }>;
    if ('children' in element.props && element.props.children != null) {
      numElements = React.Children.count(element.props.children);
    }
  }

  return (
    <div
      className={clsxCmp(
        NavBarLayout.name,
        'm-lay-mbl flex',
        numElements < 2 ? 'justify-center' : 'justify-between',
        className
      )}
    >
      {children}
    </div>
  );
}
