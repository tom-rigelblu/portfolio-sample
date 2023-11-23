// Copyright rigélblu inc. All rights reserved.
import { useRecoilState } from 'recoil';
import { Checkbox, type CheckboxChangeEvent } from '@/rb/ui/components/Base/Checkbox';
import { checkboxSelectedStateFamily } from './state';

export type CheckboxListProps = {
  stateId: string;
  items: string[];
  multiple?: boolean;
};

export function CheckboxList({ stateId, items, multiple = true }: CheckboxListProps) {
  const [selected, select] = useRecoilState(checkboxSelectedStateFamily(stateId));

  const handleChange = (e: CheckboxChangeEvent) => {
    let selectedCopy = multiple ? [...selected] : [];

    if (e.checked) selectedCopy.push(e.value as string);
    else selectedCopy = selectedCopy.filter((whoItem) => whoItem !== e.value);
    select(selectedCopy);
  };

  return (
    <div className='flex flex-wrap'>
      {items.map((subject) => (
        <Checkbox
          key={subject}
          inputId={subject}
          name='subjectsWho'
          value={subject}
          onChange={handleChange}
          checked={selected.some((item) => item === subject)}
        />
      ))}
    </div>
  );
}
