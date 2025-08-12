'use client';

import BurgerMenu from '../molecules/BurgerMenu';
import { useState } from 'react';
import { Link } from '../atoms/Link';
import { LanguageSelector } from '../molecules/LanguageSelector';

export default function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='bg-base-dark border-background fixed top-0 z-50 w-full border-b-2 shadow'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start space-x-6 text-white'>
            <BurgerMenu
              isOpen={menuOpen}
              toggle={() => setMenuOpen(!menuOpen)}
              variant='dark'
              className='!mt-0 justify-center'
            />
            <Link
              href='/dashboard'
              label='DintiiTai'
              className='text-xl text-white'
            />
          </div>
          <LanguageSelector buttonClassNames='!text-white' />
        </div>
      </div>
    </header>
  );
}
