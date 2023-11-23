// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';

// REFACTOR: to HeaderLayout
export function Header({ children }: React.PropsWithChildren) {
  return <header className={clsxCmp(Header.name, 'm-lay-mbl')}>{children}</header>;
}
