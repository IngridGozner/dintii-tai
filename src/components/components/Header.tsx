"use client"

import NextLink from 'next/link'
import { GridContainer } from '../molecules/GridContainer';
import { SITEINFO_QUERYResult } from '@/sanity/types';
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image';
import { LanguageSelector } from '../molecules/LanguageSelector';
import { Container } from '../molecules/Container';
import { Button } from '../atoms/Button';
import { Link } from '../atoms/Link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import BurgerMenu from '../molecules/BurgerMenu';

export function Header(props: NonNullable<SITEINFO_QUERYResult>) {
    const t = useTranslations('HomePage');
    const navgationLinks = [{ name: t('rates'), href: '#rates' }, { name: t('aboutUs'), href: '#aboutus' }, { name: t('contact'), href: '#contact' }];
    const [menuOpen, setMenuOpen] = useState(false);

    if (!props) return undefined;

    const { title, subtitle, logo, phone } = props;

    return (
        <header className="border-b-2 border-base-dark sticky top-0 bg-white shadow-lg z-50">
            <Container contentClass='md:!pt-4 !py-0 !mt-0'>
                <GridContainer>
                    <div className="col-span-5 md:col-span-6">
                        <NextLink
                            className="flex flex-row mt-7 mb:mt-2 md:mt-0 text-font justify-start"
                            href="/"
                        >
                            {logo &&
                                <div className="w-16 lg:w-22 aspect-square">
                                    <Image
                                        src={urlFor(logo).width(100).height(100).url()}
                                        width={100}
                                        height={100}
                                        alt={title || ''}
                                    />
                                </div>}
                            <div className="mt-3 lg:mt-6">
                                <p className="text-xl lg:text-4xl font-[Architects_Daughter]">{title}</p>
                                {subtitle && <p className="ml-3 italic text-base lg:text-2xl">{subtitle.value}
                                </p>}
                            </div>
                        </NextLink>
                    </div>

                    <div className="col-span-1 col-start-6 items-end justify-end md:col-span-6 flex md:items-end lg:mb-3">
                        <BurgerMenu isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
                        <nav className={`absolute top-full left-0 flex justify-center items-center w-full h-96 border-b-2 border-link shadow-2xl bg-background/95 ${menuOpen ? 'block' : 'hidden'} ` +
                            'md:block md:top-0 md:relative md:h-auto md:bg-transparent md:border-none md:shadow-none'}>
                            <ul className="flex gap-y-8 md:gap-x-8 lg:gap-x-18 flex-col md:flex-row md:justify-end text-2xl md:text-xl">
                                {navgationLinks.map((link, index) => <li key={link.href + index}>
                                    <Link
                                        className="!text-font"
                                        href={link.href}
                                        label={link.name}
                                        onClick={() => setMenuOpen(false)}
                                    />
                                </li>)}
                            </ul>
                        </nav>
                    </div>

                    <div className="col-span-6 md:col-span-12 flex items-center justify-center md:items-end md:justify-end">
                        <div className="flex flex-row top-0 absolute gap-x-4 md:gap-x-8 mt-1 mb:mt-3 text-base md:text-lg">
                            {phone && <Button iconName='phone' href={`tel:${phone}`} label={phone} className='h-fit' asLink />}
                            <LanguageSelector />
                        </div>
                    </div>
                </GridContainer>
            </Container>
        </header >
    )
}