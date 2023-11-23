// Copyright rigélblu inc. All rights reserved.
import { atomFamily } from 'recoil';

export const checkboxSelectedStateFamily = atomFamily<string[], string>({
  key: 'checkboxSelectedState',
  default: [],
});

export const inplaceTextStateFamily = atomFamily<string, string>({
  key: 'inplaceTextState',
  default: '',
});

// REFACTOR: use recoil atom family
export const state = {
  speakingSpeed: 5.5 * 75, // in milliseconds
  storagePath: '/local',
  staticUrl: '/local',
  typingSpeed: 30, // in milliseconds
  useAnimations: true,
} as const;
