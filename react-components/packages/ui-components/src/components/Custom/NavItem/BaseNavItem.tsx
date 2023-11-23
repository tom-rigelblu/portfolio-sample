// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { Button } from '@/rb/ui/components/Base/Button';
import { Copy } from '@/rb/ui/components/Base/Copy';
import { type ElementCTA } from '@/rb/ui/components/Base/types';
import { FocusEffect } from '@/rb/ui/components/Custom/FocusEffect';
import { useRouter } from '@/rb/ui/hooks/routing';
import { t } from '@/rb/ui/locales/en';
import { type BaseNavItemProps } from './NavItemProps';

export function BaseNavItem({
  label = '',
  back = false,
  next = false,
  returnHome = false,
  routeUrl,
  onClick,
  options = {},
  className = '',
}: BaseNavItemProps) {
  const { pushRoute } = useRouter();

  const handleOnClick = () => {
    if (routeUrl) pushRoute(routeUrl);
    if (onClick) onClick();
  };

  const navButton = (
    <NavButton
      label={label}
      back={back}
      next={next}
      returnHome={returnHome}
      routeUrl={routeUrl}
      onClick={handleOnClick}
      options={options}
    />
  );

  return (
    <div className={clsxCmp(BaseNavItem.name, className)}>
      {options.autoFocus ? <FocusEffect>{navButton}</FocusEffect> : navButton}
    </div>
  );
}

// ----- Internal API ----
function NavButton({
  label = '',
  back = false,
  next = false,
  returnHome = false,
  onClick,
  options = {},
}: Omit<BaseNavItemProps, 'className'>) {
  function getLabel() {
    if (back) return t.navigation.back;
    if (next) return t.navigation.next;
    if (returnHome) return t.navigation.returnHome;
    return label;
  }

  const cta: ElementCTA = options.primaryCTA ? { primaryCTA: true } : { secondaryCTA: true };

  return (
    <Button
      {...cta} // eslint-disable-line react/jsx-props-no-spreading
      onClick={onClick}
    >
      <Copy>{getLabel()}</Copy>
    </Button>
  );
}
