// Copyright rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import {
  ConfirmPopup as PrimeConfirmPopup,
  type ConfirmPopupOptions as PrimeConfirmPopupOptions,
} from 'primereact/confirmpopup';
import { Toast as PrimeToast, type ToastMessage as PrimeToastMessage } from 'primereact/toast';
import React, { useRef } from 'react';
import { atom, atomFamily, useRecoilState } from 'recoil';

// ----- State -----
export const confirmPopupToastAtom = {
  toastAtom: atom<React.Ref<PrimeToast | null>>({
    key: 'toastEl',
    default: null,
  }),
  targetAtom: atom<React.Ref<HTMLElement | null>>({
    key: 'targeEl',
    default: null,
  }),
  // TODO: check if visible name is right way to do
  visibleFamily: atomFamily<boolean, string>({
    key: 'visible',
    default: false,
  }),
};

// ----- Props -----
// OPTIMIZE: add tighted ts constraints (i.e. both rejectLabel and onReject must be provided)
export type BaseProps = {
  id?: string;
  message?: React.ReactNode | ((options: PrimeConfirmPopupOptions) => React.ReactNode);
  rejectLabel?: string;
  rejectToastMessage?: PrimeToastMessage;
  onReject?: () => void;
  acceptLabel?: string;
  acceptToastMessage?: PrimeToastMessage;
  onAccept?: () => void;
  dismissable?: boolean;
  className?: string;
};

export default function ConfirmPopupToast({
  id = '',
  message,
  rejectLabel,
  rejectToastMessage,
  onReject,
  acceptLabel,
  acceptToastMessage,
  onAccept,
  dismissable = true,
  className = '',
  children,
}: React.PropsWithChildren<BaseProps>) {
  const [visible, setVisible] = useRecoilState(confirmPopupToastAtom.visibleFamily(id));
  const onHide = () => setVisible(false);

  const toastEl = useRef<PrimeToast>(null);
  const targetEl = useRef<HTMLElement>(null);

  return (
    // @ts-expect-error FIXME: later
    <div ref={targetEl} className={clsxCmp(ConfirmPopupToast.name, className)}>
      <PrimeToast ref={toastEl} />
      <PrimeConfirmPopup
        // @ts-expect-error FIXME: later
        target={targetEl.current}
        message={message}
        rejectLabel={rejectLabel}
        reject={() => {
          if (toastEl.current && rejectToastMessage) toastEl.current.show(rejectToastMessage);
          if (onReject) onReject();
        }}
        acceptLabel={acceptLabel}
        accept={() => {
          if (toastEl.current && acceptToastMessage) toastEl.current.show(acceptToastMessage);
          if (onAccept) onAccept();
        }}
        visible={visible}
        onHide={onHide}
        dismissable={dismissable}
      />
      {children}
    </div>
  );
}
