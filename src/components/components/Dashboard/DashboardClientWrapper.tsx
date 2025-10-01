'use client';

import { PropsWithChildren, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from '../Sidebar';

export default function DashboardClientWrapper({
  children,
}: PropsWithChildren) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='min-h-screen'>
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className='flex flex-1 flex-col'>
        <DashboardHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div
          className={`transition-all duration-300 ${menuOpen ? 'md:ml-64' : 'md:ml-0'}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
