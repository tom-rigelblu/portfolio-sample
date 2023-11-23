// Copyright 2023 rigélblu inc. All rights reserved.
import { type RequireExactlyOne } from 'type-fest';
import { type ElementCTA } from '@/rb/ui/components/Base/types';

// ----- PropsBase -----
export type OptionsProps = {
  autoFocus?: boolean;
} & ElementCTA;

export type PropsBase = {
  options?: OptionsProps;
  className?: string;
};

// ----- LabelOptions -----
export type LabelOptions = {
  label?: string;
  back?: boolean;
  next?: boolean;
  returnHome?: boolean;
};

export type LabelResult =
  | { label: string }
  | { back: true }
  | { next: true }
  | { returnHome: true };

export type PropsLabel = RequireExactlyOne<LabelOptions, 'label' | 'back' | 'next' | 'returnHome'>;

// ----- RouteOrClickOption -----
export type RouteOrClickOptions = {
  routeUrl?: string; // replace StageType | string
  onClick?: () => void;
};

export type RouteOrClickResult = { routeUrl: string } | { onClick: () => void };
export type PropsRouteOrOnClick = RequireExactlyOne<RouteOrClickOptions, 'routeUrl' | 'onClick'>;

// ----- Props -----
export type BaseNavItemProps = PropsBase & PropsLabel & PropsRouteOrOnClick;

// ----- ButtonProps -----
export type AllButtonProps = PropsBase & PropsLabel & PropsRouteOrOnClick;
