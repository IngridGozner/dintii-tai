'use client';

import { routing } from "@/i18n/routing"
import { Button } from "../atoms/Button";
import { useContext, useState } from "react";
import { LanguageContext } from "../providers/LanguageProvider";

type LanguageProps = {
    className?: string;
}

export function LanguageSelector({ className }: LanguageProps) {
    const locales = routing.locales;
    const currentLocale = useContext(LanguageContext);

    const [isOpen, setIsOpen] = useState(false);

    return <div className={className}>
        <Button iconName="public" label={currentLocale?.toUpperCase()} className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} asLink />
        <div className={`transition-opacity duration-300 ease-in-out ${isOpen ? 'flex flex-col opacity-100 visible relative' : 'opacity-0 invisible absolute'}`}>
            {locales.map((locale) =>
                <Button key={locale} label={locale.toUpperCase()} className="flex justify-center mt-2 rounded-lg" href={`/${locale}`} />
            )}
        </div>
    </div>
}