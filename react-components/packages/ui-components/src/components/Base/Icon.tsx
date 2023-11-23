// Copyright rigélblu inc. All rights reserved.
import { clsxCmp, cmpCls } from '@rb/class-helpers';
// eslint-disable-next-line import/no-named-default
import { default as CameraSvg } from '@/rb/ui/assets/icons/camera.svg';
// eslint-disable-next-line import/no-named-default
import { default as MicrophoneSvg } from '@/rb/ui/assets/icons/microphone.svg';
import { t } from '@/rb/ui/locales/en';
import { Button } from './Button';

export const Symbol = {
  Camera: 'Camera',
  Microphone: 'Microphone',
} as const;
export type SymbolType = (typeof Symbol)[keyof typeof Symbol];

export type SymbolProps = {
  onClick: () => void;
  className: string;
};

export type IconProps = SymbolProps & {
  symbol: SymbolType;
  disabled?: boolean;
  className?: string;
};

// OPTIIMIZE: dynamicaally create it
const Component: Record<SymbolType, React.ReactElement> = {
  [Symbol.Camera]: <CameraSvg />,
  [Symbol.Microphone]: <MicrophoneSvg />,
};

export function Icon({ symbol, onClick, disabled, className = '' }: IconProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      // FIXME:
      aria-label={t.assets.icon[symbol]}
      className={clsxCmp(Icon.name, cmpCls(symbol), 'p-item-mbl', className)}
    >
      {Component[symbol]}
    </Button>
  );
}

// REFACTOR: use strategy pattern to build based on Symbol keys
Icon.Camera = function Camera({ onClick, className = '' }: SymbolProps) {
  return <Icon symbol={Symbol.Camera} onClick={onClick} className={className} />;
};

Icon.Microphone = function Microphone({ onClick, className = '' }: SymbolProps) {
  return <Icon symbol={Symbol.Microphone} onClick={onClick} className={className} />;
};
