// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import NextLink from 'next/link';

type LinkProps = {
  href: string;
  external?: boolean;
  openInNewWindow?: boolean;
  className?: string;
};

export function Link({
  href,
  external = false,
  openInNewWindow: new_window = false,
  className = '',
  children,
}: React.PropsWithChildren<LinkProps> & React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <NextLink
      className={clsxCmp(Link.name, className)}
      href={href}
      rel={external ? 'noreferrer noopener' : undefined}
      target={external || new_window ? '_blank' : undefined}
      // aria-label={external ? `${children} (opens in a new tab)`a: undefined}
    >
      {children}
    </NextLink>
  );
}
