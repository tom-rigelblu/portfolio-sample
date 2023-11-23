// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import React, { type ReactElement } from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

// REFACTOR: rename to Effect.Focus
export function FocusEffect(props: Props) {
  const { className = '', children = undefined } = props;

  return (
    <div className={clsxCmp(FocusEffect.name, className)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          // REFACTOR: use logger
          // eslint-disable-next-line no-console
          console.error(`FocusEffect: invalid child ${JSON.stringify(child, null, 2)}`);
          return child;
        }

        const childProps = child.props as { className?: string };
        return React.cloneElement(child as ReactElement<Record<string, unknown>>, {
          className: `animate-shadow ${childProps.className || ''}`,
        });
      })}
    </div>
  );
}
