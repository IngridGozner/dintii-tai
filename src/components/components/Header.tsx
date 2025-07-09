import Link from 'next/link'
import { GridContainer } from '../molecules/GridContainer';
import { HEADER_SITEINFO_QUERYResult } from '@/sanity/types';
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image';

export function Header(props: NonNullable<HEADER_SITEINFO_QUERYResult>) {
    const navgationLinks = [{ name: 'Articles', href: '/articles' }, { name: 'Prices', href: '/prices' }, { name: 'Services', href: '/services' }, { name: 'Gallery', href: '/gallery' }];

    if (!props) return undefined;

    const { title, subtitle, logo } = props;

    return (
        <header className="border-b-2 border-base-dark sticky top-0 bg-white shadow-lg">
            <div className="container mx-auto py-2 lg:py-4">
                <GridContainer>
                    <div className="col-span-6">
                        <Link
                            className="flex flex-row"
                            href="/"
                        >
                            {logo && <div className="w-16 lg:w-24 aspect-square"
                            ><Image
                                    src={urlFor(logo).width(100).height(100).url()}
                                    width={100}
                                    height={100}
                                    alt={title || ''}
                                /></div>}
                            <div className="mt-3 lg:mt-6">
                                <p className="text-xl lg:text-4xl">{title}</p>
                                {subtitle && <p className="ml-3 italic text-base lg:text-2xl">{subtitle.value}</p>}
                            </div>
                        </Link>
                    </div>
                    <nav className="col-span-6 flex items-center lg:justify-end justify-center">
                        <ul className="flex gap-x-8 lg:gap-x-12">
                            {navgationLinks.map((link, index) => <li key={link.href + index}>
                                <Link
                                    className="hover:text-link-hover hover:underline text-font transition-colors text-base lg:text-xl"
                                    href={link.href}
                                >
                                    {link.name}
                                </Link>
                            </li>)}
                        </ul>
                    </nav>
                </GridContainer>
            </div>
        </header>
    )
}