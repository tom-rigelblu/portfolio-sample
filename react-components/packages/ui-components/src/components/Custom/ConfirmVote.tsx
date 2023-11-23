// Copyright rigélblu inc. All rights reserved.
import { type ToastMessage as PrimeToastMessage } from 'primereact/toast';
import { t } from '@/rb/ui/locales/en';
import ConfirmPopupToast from './ConfirmPopupToast';

type Props = {
  id: string;
  children: React.ReactNode;
};

export function ConfirmVote({ id = '', children }: React.PropsWithChildren<Props>) {
  const acceptMessage: PrimeToastMessage = {
    severity: 'success',
    detail: t.custom.inputArea.vote,
    life: 1000,
  };

  return (
    <ConfirmPopupToast
      id={id}
      message={t.custom.inputArea.request}
      rejectLabel={t.custom.inputArea.skip}
      onReject={() => {}} // don't show any messag
      acceptLabel={t.custom.inputArea.vote}
      acceptToastMessage={acceptMessage}
    >
      {children}
    </ConfirmPopupToast>
  );
}
