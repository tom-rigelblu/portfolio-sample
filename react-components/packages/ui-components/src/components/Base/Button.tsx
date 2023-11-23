// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { Button as PrimeButton, type ButtonProps as PrimeButtonProps } from 'primereact/button';
import { type ElementCTA } from './types';

// ----- Button -----
export type ButtonProps = {
  label?: string;
} & PrimeButtonProps &
  ElementCTA;

export function Button({
  label = '',
  primaryCTA,
  secondaryCTA,
  className = '',
  onClick,
  disabled,
  icon,
  iconPos,
  severity,
  text = true,
  tooltip,
  tooltipOptions,
  children,
}: ButtonProps) {
  // REFACTOR: remove bangs after updating prime-theme.css
  type CTA = 'Primary' | 'Secondary';
  const ctaClasses: Record<CTA, string> = {
    Primary: '!bg-cta-primary !font-bold !text-white',
    Secondary: '!bg-cta-secondary !text-black',
  };

  return (
    <PrimeButton
      className={clsxCmp(
        Button.name,
        // REFACTOR: remove bangs after updating prime-theme.css
        'px-item-5 py-item-mbl !rounded !border-r-4 !border-none',
        (primaryCTA && ctaClasses.Primary) || '',
        (secondaryCTA && ctaClasses.Secondary) || '',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      icon={icon}
      iconPos={iconPos}
      severity={severity || primaryCTA ? 'secondary' : undefined}
      text={text}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
    >
      {label}
      {children}
    </PrimeButton>
  );
}
