// Copyright rigélblu inc. All rights reserved.
import { clsxCmp } from '@rb/class-helpers';
import { t } from '@/rb/ui/locales/en';
import { Copy } from './Copy';

export type VideoProps = {
  src: string;
  type?: string;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
  className?: string;
};

export function Video({
  src,
  type = 'video/mp4',
  autoplay,
  controls,
  muted = true,
  className = '',
}: VideoProps) {
  return (
    // FEAT: add track captions
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      autoPlay={autoplay || !controls}
      controls={controls}
      muted={muted}
      className={clsxCmp(Video.name, className)}
    >
      <source src={src} type={type} />
      <Copy>{t.base.video.unsupportedBrowser}</Copy>
    </video>
  );
}
