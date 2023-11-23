// Copyright rigélblu inc. All rights reserved.
import { clsx } from '@rb/class-helpers';
import { type ElementStyle } from '@/rb/ui/components/Base/types';

export function getElementStyleClasses({
  item = true,
  layout = false,
  bold = false,
  center = false,
  w_full = false,
  inline = false,
  primaryCTA = false,
}: ElementStyle): string {
  return clsx(
    // type
    item ? 'm-item-mbl' : '',
    layout ? 'my-lay-mbl' : '',
    // text
    bold ? 'font-bold' : '',
    // align
    center ? 'text-center' : '',
    w_full ? 'w-full' : '',
    // display
    inline ? 'inline' : '',
    // cta
    primaryCTA ? 'text-cta-primary' : ''
  );
}
