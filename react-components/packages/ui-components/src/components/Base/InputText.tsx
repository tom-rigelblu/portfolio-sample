// Copyright rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { InputText as PrimeInputText } from 'primereact/inputtext';
import { useEffect, useRef } from 'react';

export type InputTextProps = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

export function InputText({
  value,
  onChange,
  placeholder = '',
  autoFocus = false,
  className = '',
}: InputTextProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && ref.current) ref.current.focus();
  }, [autoFocus]);

  return (
    <PrimeInputText
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      tabIndex={0}
      className={clsxCmp(
        InputText.name,
        'py-item-mbl focus:ring-cta-primary rounded align-text-top focus:outline-none focus:ring',
        className
      )}
    />
  );
}
