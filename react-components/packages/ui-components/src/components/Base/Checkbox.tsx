// Copyright rigélblu inc. All rights reserved.
import { clsx, clsxCmp } from '@rb/class-helpers';
import {
  Checkbox as PrimeCheckbox,
  type CheckboxChangeEvent as PrimeCheckboxChangeEvent,
} from 'primereact/checkbox';
import { Copy } from './Copy';

export type CheckboxChangeEvent = PrimeCheckboxChangeEvent;

export type Props = {
  inputId: string;
  name: string;
  value: string;
  checked: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
  disabled?: boolean;
  className?: string;
};

export function Checkbox({
  inputId,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  className = '',
}: Props) {
  return (
    <div className='m-item-mbl flex items-center'>
      <PrimeCheckbox
        inputId={inputId}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={clsxCmp(Checkbox.name, className)}
      />
      <label
        htmlFor={inputId}
        className={clsx('pointer-events-auto', disabled ? '' : 'cursor-pointer')}
      >
        <Copy>{value}</Copy>
      </label>
    </div>
  );
}
