// Copyright 2023 rigélblu inc. All rights reserved.
// FIXME: use @ imports
import { clsxCmp } from '@rb/class-helpers';
import { Link } from '@/rb/ui/components/Base/Link';
import { Copy } from '@/rb/ui/components/Base/Copy';

// REFACTOR: to FooterLayout
export function Footer() {
  return (
    <footer className={clsxCmp(Footer.name, 'flex')}>
      <div className='m-lay-mbl flex w-full flex-col items-center justify-between md:flex-row '>
        <Copy className='mb-0'>
          magin is a product of&nbsp;
          <Link href='https://rigelblu.com' className='text-cta-primary'>
            rigélblu
          </Link>
        </Copy>
        <Copy className='mt-0'>&copy; 2023 rigélblu inc. all rights reserved.</Copy>
        {/* <Link href='/terms'>Terms </Link> | <Link href='/privacy'>Privacy</Link> */}
      </div>
    </footer>
  );
}
