'use client';

import NavigationGroup from '../molecules/NavigationGroup';
import {
  defaultDictionaryEntries,
  useDictionary,
} from '../providers/DictionaryProvider';
import { useEffect, useState } from 'react';
import { removeLocaleFromPathName, subscribeToEvent } from '@/helpers';
import { signOut } from '@/supabase/actions/userActions';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathName = usePathname();
  const dictionary = useDictionary();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('');

  const { menu, general } = dictionary || defaultDictionaryEntries;

  useEffect(() => {
    subscribeToEvent('toggleMenu', (e) => {
      setMenuOpen(e.detail);
    });

    setActiveTab(removeLocaleFromPathName(pathName));

    return () => document.removeEventListener('toggleMenu', () => {});
  }, [pathName]);

  const menuLinks = [
    {
      name: dictionary?.dashboard || '',
      href: '/dashboard',
      icon: 'dashboard',
    },
    {
      name: dictionary?.patients || '',
      href: '/dashboard/patients',
      icon: 'perm_identity',
    },
  ];
  const generalLinks = [
    {
      name: dictionary?.logout || '',
      onClick: () => {
        signOut();
      },
      icon: 'exit_to_app',
    },
  ];

  return (
    <aside
      id='logo-sidebar'
      className={`bg-base-dark border-background fixed left-0 z-40 h-screen w-64 -translate-x-full border-r pt-20 transition-transform sm:translate-x-0 ${menuOpen ? 'translate-x-0' : ''}`}
      aria-label='Sidebar'
    >
      <nav className='bg-base-dark h-full space-y-8 overflow-y-auto px-3 pb-4'>
        <NavigationGroup
          groupTitle={menu ?? ''}
          navigationLinks={menuLinks}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <NavigationGroup
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          groupTitle={general ?? ''}
          navigationLinks={generalLinks}
        />
      </nav>
    </aside>
  );
}
