// Copyright rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { InputTextArea, type InputTextAreaProps } from '@/rb/ui/components/Base/InputTextArea';
import { Toolbar } from './Toolbar';

type InputAreaToolbarProps = {
  onCameraClick?: () => void;
  onMicrophoneClick?: () => void;
  className?: string;
} & InputTextAreaProps;

export function InputAreaToolbar({
  value,
  onChange,
  placeholder = '',
  autoFocus: focus = false,
  onCameraClick,
  onMicrophoneClick,
  className = '',
}: InputAreaToolbarProps) {
  return (
    <div className={clsxCmp(InputAreaToolbar.name, 'relative flex flex-col', className)}>
      <InputTextArea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={focus}
        className={className}
      />
      <Toolbar
        onCameraClick={onCameraClick}
        onMicClick={onMicrophoneClick}
        className='absolute bottom-0 right-0'
      />
    </div>
  );
}
