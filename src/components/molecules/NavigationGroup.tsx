import { NavigationLink } from '@/types/GeneralTypes';
import { Link } from '../atoms/Link';

type NavigationGroupProps = {
  groupTitle: string;
  navigationLinks: NavigationLink[];
  className?: string;
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
};

export default function NavigationGroup(props: NavigationGroupProps) {
  const { groupTitle, navigationLinks, className, activeTab, setActiveTab } =
    props;

  return (
    <div className={className}>
      <p className='text-background mb-4 text-base'>
        {groupTitle.toUpperCase()}
      </p>
      <ul className='space-y-2 font-medium'>
        {navigationLinks.map((link, index) => {
          return link.name ? (
            <li key={index}>
              <Link
                className={`hover:bg-link-hover rounded-lg px-4 py-2 text-xl !text-white hover:!text-white ${
                  activeTab === link.href ? '!bg-link-hover' : ''
                }`}
                href={link.href ?? ''}
                label={link.name}
                iconName={link.icon}
                onClick={() => {
                  if (link.onClick) {
                    link.onClick();
                  }
                  if (link.href) {
                    setActiveTab(link.href);
                  }
                }}
              />
            </li>
          ) : undefined;
        })}
      </ul>
    </div>
  );
}
