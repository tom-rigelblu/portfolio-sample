// Copyright 2023 rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import NextImage from 'next/image';

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export function Image({
  src,
  alt,
  fill = true,
  priority = false,
  className = '',
  imageClassName = 'object-scale-down',
}: Props) {
  return (
    // FIXME: make image fill height of image, not of div
    <div className={clsxCmp(Image.name, 'relative h-full w-full', className)}>
      <NextImage src={src} alt={alt} className={imageClassName} fill={fill} priority={priority} />
    </div>
  );
}
