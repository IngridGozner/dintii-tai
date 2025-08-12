import { SanityDocument } from 'next-sanity';

export function getEnglishNameFromInternationalizedField(
  document: SanityDocument,
  element: string
): string {
  const array = document?.[element];

  if (Array.isArray(array)) {
    const roTitle = array.find((item) => item._key === 'ro')?.value;
    return roTitle;
  }

  return 'untitled';
}

export function getInternationalizedPreviewTitle(
  selection: Record<'title', string>
): { title: string } {
  const { title, ...rest } = selection;

  const roTitle = Array.isArray(title)
    ? title.find((item) => item._key === 'ro')?.value || 'No title'
    : 'No title';

  return {
    title: roTitle,
    ...rest,
  };
}

export function triggerEvent(eventName: string, data: string | boolean) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export function subscribeToEvent(
  eventName: string,
  customFunction: (e: CustomEvent) => void
) {
  document.addEventListener(eventName, (e: Event) => {
    customFunction(e as CustomEvent);
  });
}
