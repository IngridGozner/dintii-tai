import { SanityDocument } from "next-sanity";

export function getEnglishNameFromInternationalizedField(document: SanityDocument, element: string): string {
    const array = document?.[element];

    if (Array.isArray(array)) {
        const enTitle = array.find((item: any) => item._key === 'en')?.value;
        return enTitle;
    }

    return 'untitled';
}

export function getInternationalizedPreviewTitle(selection: Record<"title", any>): { title: string } {
    const { title, ...rest } = selection;

    const enTitle = Array.isArray(title)
        ? title.find(item => item._key === 'en')?.value || 'No title'
        : 'No title';

    return {
        title: enTitle,
        ...rest
    };
}