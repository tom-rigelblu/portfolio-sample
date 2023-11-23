// Copyright 2023 rigélblu inc. All rights reserved.
import { type RequireOneOrNone } from 'type-fest';

// ----- Element -----
export type ElementType = RequireOneOrNone<{
  item: boolean;
  layout: boolean;
}>;

export type ElementText = {
  bold?: boolean;
  center?: boolean;
  inline?: boolean;
  w_full?: boolean;
};

export type ElementCTA = RequireOneOrNone<{
  primaryCTA: boolean;
  secondaryCTA: boolean;
  // FEAT: add tertiary
}>;

export type ElementStyle = ElementType & ElementText & ElementCTA;
