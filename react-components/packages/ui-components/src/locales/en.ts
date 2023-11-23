// Copyright 2023 rigélblu inc. All rights reserved.

// OPTIMIZE: read based on language
export const locale = {
  assets: {
    icon: {
      Camera: 'Take picture',
      Microphone: 'Record voice',
    },
  },

  base: {
    video: {
      unsupportedBrowser: 'Your browser does not support the video',
    },
  },

  custom: {
    preview: 'upcoming feature: design preview',
    inputArea: {
      request: 'Request feature',
      skip: 'Skip',
      vote: '+1 vote',
    },
  },

  navigation: {
    back: 'Back',
    next: 'Next',
    returnHome: 'Return Home',
  },
} as const;

export type LocaleType = typeof locale;
export const t: LocaleType = locale;
