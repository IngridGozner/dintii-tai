import BurgerMenu from '../../molecules/BurgerMenu';
import { Link } from '../../atoms/Link';
import { LanguageSelector } from '../../molecules/LanguageSelector';
import { useSiteInfo } from '../../providers/SiteInfoProvider';

export type MenuProps = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export default function DashboardHeader({ menuOpen, setMenuOpen }: MenuProps) {
  const siteInfo = useSiteInfo();

  const { logo, title } = siteInfo || {};

  return (
    <header className='bg-base-dark border-background peer fixed top-0 z-50 w-full border-b-2 shadow'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start space-x-6 text-white'>
            <BurgerMenu
              isOpen={menuOpen}
              toggle={() => {
                setMenuOpen(!menuOpen);
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
