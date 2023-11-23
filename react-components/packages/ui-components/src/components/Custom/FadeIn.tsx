// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';

type FadeInProps = {
  className?: string;
};

export function FadeIn({ children, className = '' }: React.PropsWithChildren<FadeInProps>) {
  return (
    <div className={clsxCmp(FadeIn.name, 'animate-fadeIn flex flex-1', className)}>{children}</div>
  );
}
