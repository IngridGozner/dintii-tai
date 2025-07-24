'use client'

import { DICTIONARY_QUERYResult } from '@/sanity/types'
import { createContext } from 'react'

export const defaultDictionaryEntries = {
    prices: null,
    aboutUs: null,
    pricesTableTitle: null,
    treatmentTableTitle: null,
    contact: null,
    schedule: null,
}

export const DictionaryContext = createContext<NonNullable<DICTIONARY_QUERYResult> | null>(defaultDictionaryEntries)

export default function DictionaryProvider({
    children,
    dictionaryEntries
}: {
    children: React.ReactNode
    dictionaryEntries: NonNullable<DICTIONARY_QUERYResult> | null;
}) {
    return <DictionaryContext.Provider value={dictionaryEntries || defaultDictionaryEntries}>{children}</DictionaryContext.Provider>
}