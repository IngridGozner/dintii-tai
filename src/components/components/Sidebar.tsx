'use client';

import { signOut } from '@/app/[lang]/login/actions';
import NavigationGroup from '../molecules/NavigationGroup';

export default function Sidebar() {
  const menuLinks = [
    { name: 'Overview', href: '/dashboard', icon: 'dashboard' },
    { name: 'Patients', href: '/dashboard/patients', icon: 'perm_identity' },
  ];
  const generalLinks = [
    {
      name: 'Logout',
      onClick: () => {
        signOut();
      },
      icon: 'exit_to_app',
    },
  ];

  return (
    <aside
      id='logo-sidebar'
      className='bg-base-dark border-background fixed left-0 z-40 h-screen w-64 -translate-x-full border-r pt-20 transition-transform sm:translate-x-0'
      aria-label='Sidebar'
    >
      <nav className='bg-base-dark h-full space-y-8 overflow-y-auto px-3 pb-4'>
        <NavigationGroup groupTitle={'Menu'} navigationLinks={menuLinks} />
        <NavigationGroup
          groupTitle={'General'}
          navigationLinks={generalLinks}
        />
      </nav>
    </aside>
  );
}
