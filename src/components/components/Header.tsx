import NextLink from 'next/link'
import { GridContainer } from '../molecules/GridContainer';
import { HEADER_SITEINFO_QUERYResult } from '@/sanity/types';
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image';
import { LanguageSelector } from '../molecules/LanguageSelector';
import { Container } from '../molecules/Container';
import { Button } from '../atoms/Button';
import { Link } from '../atoms/Link';
import { useTranslations } from 'next-intl';

export function Header(props: NonNullable<HEADER_SITEINFO_QUERYResult>) {
    const t = useTranslations('HomePage');
    const navgationLinks = [{ name: t('rates'), href: '#rates' }, { name: t('aboutUs'), href: '#aboutus' }, { name: 'Contact', href: '#contact' }];

    if (!props) return undefined;

    const { title, subtitle, logo, phone, name } = props;

    const browserTitle = `${title} | ${name}`

    return (
        <header className="border-b-2 border-base-dark sticky top-0 bg-white shadow-lg z-50">
            <title>{browserTitle}</title>

            <Container contentClass='!py-4 !mt-0'>
                <GridContainer>
                    <div className="col-span-6">
                        <NextLink
                            className="flex flex-row mt-7 md:mt-0 text-font"
                            href="/"
                        >
                            {logo && <div className="w-16 lg:w-22 aspect-square"
                            ><Image
                                    src={urlFor(logo).width(100).height(100).url()}
                                    width={100}
                                    height={100}
                                    alt={title || ''}
                                /></div>}
                            <div className="mt-3 lg:mt-6">
                                <p className="text-xl lg:text-4xl font-[Architects_Daughter]">{title}</p>
                                {subtitle && <p className="ml-3 italic text-base lg:text-2xl">{subtitle.value}
                                </p>}
                            </div>
                        </NextLink>
                    </div>
                    <div className="col-span-6 flex flex-col items-center justify-center md:items-end">
                        <div className="flex flex-row top-0 absolute gap-x-4 md:gap-x-8 mt-3 text-base md:text-lg">
                            {phone && <Button iconName='phone' href={`tel:${phone}`} label={phone} className='h-fit' asLink />}
                            <LanguageSelector />
                        </div>
                        <nav className='md:mt-6'>
                            <ul className="flex gap-x-8 lg:gap-x-18">
                                {navgationLinks.map((link, index) => <li key={link.href + index}>
                                    <Link
                                        className="!text-font transition-colors text-base lg:text-xl"
                                        href={link.href}
                                        label={link.name}
                                    />
                                </li>)}
                            </ul>
                        </nav>
                    </div>
                </GridContainer>
            </Container>
        </header >
    )
}