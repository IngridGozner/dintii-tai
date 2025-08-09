'use client';

import { PropsWithChildren } from 'react';

type ProviderProps = PropsWithChildren;

export function Providers(props: ProviderProps) {
    const { children } = props;
    return (
        <>
            {/* <DictionaryProvider dictionaryEntries={defaultDictionaryEntries}> */}
            {children}
            {/* </DictionaryProvider> */}
        </>
    );
}