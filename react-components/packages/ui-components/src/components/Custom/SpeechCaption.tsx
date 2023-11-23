// Copyright 2023 rigélblu inc. All rights reserved.
import { clsx, clsxCmp } from '@rb/class-helpers';
import anime from 'animejs';
import { cloneElement, isValidElement, useEffect, useState, Children } from 'react';
import { state } from './state';

export type SpeechCaptionProps = {
  text?: string | string[];
  loop?: boolean;
  className?: string;
};

const CaptionWord = {
  IdClass: 'mgn-caption-message',
  StyleClasses: [
    'bg-cta-primary',
    'text-white',
    '-skew-x-12',
    'rounded',
    // Disable until we figure out how to prevent text from shifting
    // 'font-bold',
    // 'block',
    // 'mx-1',
  ],
};

export function SpeechCaption({
  text = '',
  loop = false,
  className = '',
  children,
}: React.PropsWithChildren<SpeechCaptionProps>) {
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);

  // Prepare text for hightlighting
  function createTextWordCaptions() {
    return typeof text === 'string'
      ? createWordCaptions(text)
      : createWordCaptions(text[highlightedWordIndex]);
  }

  // Prepare children for highlighting
  function createChildrenWordCaptions() {
    return Children.map(children, (child) => {
      const typedChild = child as React.ReactElement<{ children?: React.ReactNode }>;

      if (isValidElement(child) && typeof typedChild.props.children === 'string') {
        const childText: string = typedChild.props.children;
        const tokenElements = createWordCaptions(childText);
        return cloneElement(typedChild, { children: tokenElements });
      }
      return child;
    });
  }

  // Hightlight words at one a time
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!state.useAnimations) return;

    const wordElements = document.querySelectorAll(`.${CaptionWord.IdClass}`);
    const timeline = anime.timeline({
      loopComplete: () =>
        setHighlighedWordIndex(text, highlightedWordIndex, setHighlightedWordIndex),
      loop,
    });

    wordElements.forEach((wordEl) => {
      timeline.add({
        targets: wordEl,
        duration: state.speakingSpeed,
        begin: () => wordEl.classList.add(...CaptionWord.StyleClasses),
        complete: () => wordEl.classList.remove(...CaptionWord.StyleClasses),
      });
    });
    // highlighWord is arrow fn, not dependency
  }, [highlightedWordIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={clsxCmp(SpeechCaption.name)}>
      <p className={clsx('my-1', className)}>{createTextWordCaptions()}</p>
      {createChildrenWordCaptions()}
    </div>
  );
}

// ----- Internal API -----
// OPTIMIZE: figure out how to apply skew and padding without shifting the text
function wordCaptionWrapper(key: string, word: string) {
  return (
    <span key={key}>
      <span className={clsx(CaptionWord.IdClass, 'inline-block')}>{word}</span>
      &nbsp;
    </span>
  );
}

function createWordCaptions(txt: string) {
  const words = splitIntoWords(txt);
  return words.map((word, index) => wordCaptionWrapper(`${word}.${index}`, word));
}

// Sets index when text is array and each array element is showing one at a time
function setHighlighedWordIndex(
  text: string | string[],
  highlightedIndex: number,
  setHighlightIndex: (index: number) => void
) {
  return Array.isArray(text) && setHighlightIndex((highlightedIndex + 1) % text.length);
}

function splitIntoWords(str: string): string[] {
  return str.split(/\s+/);
}
