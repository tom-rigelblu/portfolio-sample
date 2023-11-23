// Copyright 2023 rigélblu inc. All rights reserved.
import { type BaseNavItem } from './BaseNavItem';
import { type AllButtonProps, type BaseNavItemProps } from './NavItemProps';

export type AllNavItems = React.FC<BaseNavItemProps> & CompoundNavItems;

export type BaseNavItemType = typeof BaseNavItem;
export type NavBarItemsType =
  | React.ReactElement<BaseNavItemType>
  | React.ReactElement<BaseNavItemType>[]
  | React.ReactNode
  | null
  | undefined
  | false;

// ----- ItemComponents -----
export type CompoundNavItems = {
  Button: React.FC<AllButtonProps>;
  SecondaryButton: React.FC<AllButtonProps>;
  PrimaryButton: React.FC<AllButtonProps>;
  PrimaryFocusButton: React.FC<AllButtonProps>;
};
