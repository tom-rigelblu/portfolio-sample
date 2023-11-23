// Copyright rigélblu inc. All rights reserved.
import { atom } from 'recoil';

export const topPaneClassNameAtom = atom<string>({
  key: 'topPaneClassName',
  default: undefined,
});

export const bottomPaneClassNameAtom = atom<string>({
  key: 'bottomPaneClassName',
  default: undefined,
});
