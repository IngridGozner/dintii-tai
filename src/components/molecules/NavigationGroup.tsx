import { NavigationLink } from '@/types/GeneralTypes';
import { Link } from '../atoms/Link';

type NavigationGroupProps = {
  groupTitle: string;
  navigationLinks: NavigationLink[];
  className?: string;
};

export default function NavigationGroup(props: NavigationGroupProps) {
  const { groupTitle, navigationLinks, className } = props;

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
                className='hover:bg-link-hover rounded-lg px-4 py-2 text-xl !text-white hover:!text-white'
                href={link.href ?? ''}
                label={link.name}
                iconName={link.icon}
                onClick={link.onClick}
              />
            </li>
          ) : undefined;
        })}
      </ul>
    </div>
  );
}
