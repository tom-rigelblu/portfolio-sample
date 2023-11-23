// Copyright rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { useSetRecoilState } from 'recoil';
import { Icon } from '@/rb/ui/components/Base/Icon';
import { confirmPopupToastAtom } from './ConfirmPopupToast';
import { ConfirmVote } from './ConfirmVote';

export type ToolbarProps = {
  onCameraClick?: () => void;
  onMicClick?: () => void;
  className?: string;
};

export function Toolbar({
  onCameraClick,
  onMicClick,
  className = '',
  children,
}: React.PropsWithChildren<ToolbarProps>) {
  const size = 'w-8 h-auto';

  // REFACTOR: use types
  const setCameraVisible = useSetRecoilState(confirmPopupToastAtom.visibleFamily('camera'));
  const showCameraPopup = () => setCameraVisible(true);

  const setMicVisible = useSetRecoilState(confirmPopupToastAtom.visibleFamily('mic'));
  const showMicPopup = () => setMicVisible(true);

  // REFACTOR: use prime react's toolbar
  return (
    <div className={clsxCmp(Toolbar.name, 'm-item-mbl flex justify-end', className)}>
      <ConfirmVote id='camera'>
        {onCameraClick ? <Icon.Camera onClick={showCameraPopup} className={size} /> : null}
      </ConfirmVote>

      <ConfirmVote id='mic'>
        {onMicClick ? <Icon.Microphone onClick={showMicPopup} className={size} /> : null}
      </ConfirmVote>
      {children}
    </div>
  );
}
