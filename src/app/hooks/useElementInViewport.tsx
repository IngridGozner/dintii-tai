import { RefObject, useEffect, useRef, useState } from 'react';

export const useElementInViewport = (
  options?: IntersectionObserverInit
): [RefObject<HTMLDivElement | null>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};
