'use client';

import BurgerMenu from '../molecules/BurgerMenu';
import { useContext, useState } from 'react';
import { Link } from '../atoms/Link';
import { LanguageSelector } from '../molecules/LanguageSelector';
import { SiteInfoContext } from '../providers/SiteInfoProvider';
import { triggerEvent } from '@/helpers';

export default function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const siteInfo = useContext(SiteInfoContext);

  const { logo, title } = siteInfo || {};

  return (
    <header className='bg-base-dark border-background fixed top-0 z-50 w-full border-b-2 shadow'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start space-x-6 text-white'>
            <BurgerMenu
              isOpen={menuOpen}
              toggle={() => {
                setMenuOpen(!menuOpen);
                triggerEvent('toggleMenu', !menuOpen);
              }}
              variant='dark'
              className='!mt-0 justify-center'
            />
            <Link
              href='/dashboard'
              label={title}
              className='font-[Architects_Daughter] text-2xl text-white hover:!text-white'
              logo={logo ? { image: logo } : undefined}
            />
          </div>
          <LanguageSelector buttonClassNames='!text-white' />
        </div>
      </div>
    </header>
  );
}
