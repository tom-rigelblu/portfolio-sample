// Copyright 2023 rigélblu inc. All rights reserved.
import { clsx, clsxCmp, cmpCls } from '@rb/class-helpers';
import { ListBox, type ListBoxChangeEvent } from 'primereact/listbox';
import { useRouter } from '@/rb/ui/hooks/routing';
import { Copy } from './Copy';

// ----- OrderedList -----
type OrderedListProps = {
  items: ListItemType[];
};

export function OrderedList({ items }: OrderedListProps) {
  const { pushRoute } = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!items || items.length === 0) {
    // REFACTOR: use logger
    // eslint-disable-next-line no-console
    console.error('OrderedList: items is empty');
    return <div />;
  }

  const itemsObj = items.map((item, index) => ({
    label: item.label,
    index: index + 1,
    focus: item.focus,
    routeUrl: item.routeUrl,
  }));

  const itemTemplate = (item: ListItemObj) => <ListItem item={item} />;

  const handleOnChange = (e: ListBoxChangeEvent) => {
    const { routeUrl } = e.value as { routeUrl: string };
    pushRoute(routeUrl);
  };

  return (
    <ListBox
      options={itemsObj}
      itemTemplate={itemTemplate}
      onChange={handleOnChange}
      className={cmpCls(OrderedList.name)}
    />
  );
}

// ----- ListItem -----
// OPTIMIZE: support string | React.ReacNode | { label: string; routeUrl: string; type?: 'ListItemObj';}
export const ListItemStyle = { RoundedFull: 'RoundedFull' } as const;
export type ListItemStyleType = (typeof ListItemStyle)[keyof typeof ListItemStyle];

export type ListItemType = {
  label: string;
  routeUrl: string;
  focus?: boolean;
  type?: 'ListItemObj';
};

type ListItemObj = {
  label: string;
  index: number;
  routeUrl: string;
  focus?: boolean;
  type?: 'ListItemObj';
};

type ListItemProps = {
  item: ListItemObj;
  style?: ListItemStyleType;
};

function ListItem({ item, style = ListItemStyle.RoundedFull }: ListItemProps) {
  const { pushRoute } = useRouter();

  const handleClick = () => {
    pushRoute(item.routeUrl, ListItem.name);
  };

  return (
    <button
      className={clsxCmp(ListItem.name, 'flex items-center')}
      onClick={handleClick}
      type='button'
    >
      <Circle item={item} style={style} />
      <Copy primaryCTA={item.focus ?? false} bold={item.focus ?? false}>
        {item.label}
      </Copy>
    </button>
  );
}

// ----- Circle -----
function Circle({ item, style }: ListItemProps) {
  return (
    <Copy
      primaryCTA={item.focus ?? false}
      bold={item.focus ?? false}
      className={clsx(
        'p-item-5 flex h-2 w-2 items-center justify-center',
        style === ListItemStyle.RoundedFull ? 'rounded-full border-2' : '',
        item.focus ? ' border-blue-rb-500 bg-blue-rb-100' : ''
      )}
    >
      {item.index}
    </Copy>
  );
}
