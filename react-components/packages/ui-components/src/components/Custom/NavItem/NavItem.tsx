/* eslint-disable react/function-component-definition */
// Copyright rigélblu inc. All rights reserved
import { type RequireAtLeastOne } from 'type-fest';
import { BaseNavItem } from './BaseNavItem';
import type {
  AllButtonProps,
  LabelOptions,
  LabelResult,
  RouteOrClickOptions,
  RouteOrClickResult,
} from './NavItemProps';
import { type AllNavItems } from './types';

export const NavItem = BaseNavItem as AllNavItems;

// Compound components for NavItem
// ----- Button -----
NavItem.Button = (props: AllButtonProps) => {
  const {
    label = '',
    back,
    next,
    returnHome,
    routeUrl = '', // FIXME: rename to routeStage
    onClick,
    options,
    className = '',
  } = props;

  return (
    <BaseNavItem
      {...selectLabelOption({ label, back, next, returnHome })} // eslint-disable-line react/jsx-props-no-spreading
      {...selectRouteOrClick({ routeUrl, onClick })} // eslint-disable-line react/jsx-props-no-spreading
      options={options}
      className={className}
    />
  );
};

// ----- BackButton -----
NavItem.SecondaryButton = ({
  label = '',
  back = false,
  next = false,
  returnHome = false,
  routeUrl = '',
  onClick,
  options = {},
  className,
}: AllButtonProps) => (
  <BaseNavItem
    {...selectLabelOption({ label, back, next, returnHome })} // eslint-disable-line react/jsx-props-no-spreading
    {...selectRouteOrClick({ routeUrl, onClick })} // eslint-disable-line react/jsx-props-no-spreading
    options={
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      options ? { ...options, primaryCTA: undefined, secondaryCTA: true } : { secondaryCTA: true }
    }
    className={className}
  />
);

// ----- NextButton -----
NavItem.PrimaryButton = ({
  label = '',
  back = false,
  next = false,
  returnHome = false,
  routeUrl = '',
  onClick,
  options,
  className,
}: AllButtonProps) => (
  <BaseNavItem
    {...selectLabelOption({ label, back, next, returnHome })} // eslint-disable-line react/jsx-props-no-spreading
    {...selectRouteOrClick({ routeUrl, onClick })} // eslint-disable-line react/jsx-props-no-spreading
    options={
      options ? { ...options, primaryCTA: true, secondaryCTA: undefined } : { primaryCTA: true }
    }
    className={className}
  />
);

// ----- FocusPrimaryButton -----
NavItem.PrimaryFocusButton = ({
  label = '',
  back = false,
  next = false,
  returnHome = false,
  routeUrl = '',
  onClick,
  options,
  className,
}: AllButtonProps) => (
  <BaseNavItem
    {...selectLabelOption({ label, back, next, returnHome })} // eslint-disable-line react/jsx-props-no-spreading
    {...selectRouteOrClick({ routeUrl, onClick })} // eslint-disable-line react/jsx-props-no-spreading
    options={
      options
        ? { ...options, primaryCTA: true, secondaryCTA: undefined, autoFocus: true }
        : { primaryCTA: true, autoFocus: true }
    }
    className={className}
  />
);

// ----- Internal API -----
function selectLabelOption({
  label,
  back,
  next,
  returnHome,
}: RequireAtLeastOne<LabelOptions>): LabelResult {
  if (label) return { label };
  if (back) return { back };
  if (next) return { next };
  if (returnHome) return { returnHome };

  // REFACTOR: use logger
  // eslint-disable-next-line no-console
  console.error(
    `${NavItem.name} / ${selectLabelOption.name} \n at least one property to be present`
  );
  return { label: '' };
}

function selectRouteOrClick({
  routeUrl,
  onClick,
}: RequireAtLeastOne<RouteOrClickOptions>): RouteOrClickResult {
  if (routeUrl) return { routeUrl };
  if (onClick) return { onClick };

  // REFACTOR: use logger
  // eslint-disable-next-line no-console
  console.error(
    `${NavItem.name} / ${selectRouteOrClick.name} \n at least one property to be present`
  );
  return { onClick: () => {} };
}
