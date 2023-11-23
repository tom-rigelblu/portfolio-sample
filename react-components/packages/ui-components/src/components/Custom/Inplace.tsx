// Copyright rigélblu inc. All rights reserved.
import { clsx, clsxCmp } from '@rb/class-helpers';
import { Inplace as PrimeInplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { useRecoilState } from 'recoil';
import { InputText } from '@/rb/ui/components/Base/InputText';
import { inplaceTextStateFamily } from './state';
import styles from './Inplace.module.scss'; // FIXME

export type InplaceProps = {
  stateId: string;
  textLabel: string;
  inputPlaceholder?: string;
  autoFocus?: boolean;
  className?: string;
  inputTextClassName?: string;
};

// FEAT: collapse on clicking outside
export function Inplace({
  stateId,
  textLabel,
  inputPlaceholder = '',
  autoFocus = false,
  className = '',
  inputTextClassName = '',
}: InplaceProps) {
  const [value, setValue] = useRecoilState(inplaceTextStateFamily(stateId));

  return (
    <div className={clsxCmp(Inplace.name, styles['mgn-inplace'], className)}>
      <PrimeInplace closable>
        <InplaceDisplay>{value || textLabel}</InplaceDisplay>
        <InplaceContent>
          <InputText
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            placeholder={inputPlaceholder}
            autoFocus={autoFocus}
            className={clsx('py-item-1', inputTextClassName)}
          />
        </InplaceContent>
      </PrimeInplace>
    </div>
  );
}
