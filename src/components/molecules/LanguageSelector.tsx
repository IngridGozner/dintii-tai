'use client';

import { routing } from "@/i18n/routing"
import { Button } from "../atoms/Button";
import { useContext, useState } from "react";
import { LanguageContext } from "../providers/LanguageProvider";

export function LanguageSelector() {
    const locales = routing.locales;
    const currentLocale = useContext(LanguageContext);

    const [isOpen, setIsOpen] = useState(false);

    return <div>
        <Button iconName="public" label={currentLocale?.toUpperCase()} className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
        <div className={`transition-opacity duration-300 ease-in-out ${isOpen ? 'flex flex-col opacity-100' : 'opacity-0'}`}>
            {locales.map((locale) =>
                <Button key={locale} label={locale.toUpperCase()} className="flex justify-center mt-2" href={`/${locale}`} />
            )}
        </div>
    </div>
}