// Copyright 2023 rigélblu inc. All rights reserved.
// FIXME: use @ imports
import { clsxCmp } from '@rb/class-helpers';
import { type RequireExactlyOne } from 'type-fest';
import { getElementStyleClasses } from '@/rb/ui/lib/style-css';
import { type ElementStyle } from './types';

// ----- Copy -----
export type LabelorChildrenProps = {
  label: string;
  children: React.ReactNode;
};

export type CopyProps = { className?: string } & RequireExactlyOne<LabelorChildrenProps> &
  ElementStyle;

export function Copy({
  label,
  children,
  item = true,
  inline,
  layout,
  primaryCTA,
  bold,
  center,
  w_full,
  className = '',
}: CopyProps) {
  const type = item ? { item } : { layout: layout ?? false };
  const text = {
    bold,
    center,
    inline,
    w_full,
  };
  const cta = primaryCTA ? { primaryCTA } : {};

  return (
    <div
      className={clsxCmp(
        Copy.name,
        getElementStyleClasses({ ...type, ...text, ...cta }),
        className
      )}
    >
      {label ? toHTML(label) : null}
      {children}
    </div>
  );
}

// ----- Copy.CTA -----
export type CopyCTAProps = {
  primary?: boolean;
};

Copy.CTA = function CopyCTA({
  primary = true,
  label = '',
  children,
  item = true,
  layout,
  bold,
  center,
  w_full,
  className,
}: CopyCTAProps & CopyProps) {
  const labelorChildrenProp = label ? { label } : { children: children ?? null };
  const typeProp = item ? { item } : { layout: layout ?? false };

  return (
    <Copy
      {...labelorChildrenProp} // eslint-disable-line react/jsx-props-no-spreading
      {...typeProp} // eslint-disable-line react/jsx-props-no-spreading
      bold={bold}
      center={center}
      w_full={w_full}
      className={clsxCmp(CopyCTA.name, primary ? 'text-cta-primary' : '', className || '')}
    />
  );
};

// ----- Internal API -----
// REFACTOR: move to packages
function splitNewlines(str: string): string[] {
  return str.split('\n');
}

function toHTML(str: string) {
  return splitNewlines(str).map((line, index, array) =>
    index === array.length - 1 ? (
      line
    ) : (
      // eslint-disable-next-line react/no-array-index-key
      <span key={`${line}.${index}`} className='contents'>
        {line}
        <br />
      </span>
    )
  );
}
