// Copyright rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { Button, type ButtonProps } from '@/rb/ui/components/Base/Button'; // FIXME: can't find module with @/components/...

export type CardProps = {
  border?: boolean;
  className?: string;
} & ButtonProps;

export function Card({
  border = false,
  onClick,
  disabled,
  tooltip,
  tooltipOptions,
  className = '',
  children,
}: React.PropsWithChildren<CardProps>) {
  return (
    <Button
      className={clsxCmp(
        Card.name,
        // FIXME: styles are not being applied
        'p-item-mbl',
        // h-full is required when tooltip is shown. not sure why
        'flex h-full w-full flex-1 flex-col justify-start text-center',
        'text-cta-primary',
        border ? 'border-blue-rb-700 rounded border-solid' : '',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
    >
      {children}
    </Button>
  );
}
