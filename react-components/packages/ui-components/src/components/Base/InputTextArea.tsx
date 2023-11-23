// Copyright rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { InputTextarea as PrimeInputTextArea } from 'primereact/inputtextarea';
import { useEffect, useRef } from 'react';

export type InputTextAreaProps = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

export function InputTextArea({
  value,
  onChange,
  placeholder = '',
  autoFocus = false,
  className = '',
}: InputTextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && ref.current) ref.current.focus();
  }, [autoFocus]);

  return (
    <PrimeInputTextArea
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      tabIndex={0}
      className={clsxCmp(
        InputTextArea.name,
        'p-item-mbl focus:ring-cta-primary rounded align-text-top focus:outline-none focus:ring',
        className
      )}
    />
  );
}
