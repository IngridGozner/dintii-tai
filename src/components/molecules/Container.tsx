'use client';

import { PropsWithChildren, useRef, useEffect, useState } from 'react';

export type ContainerProps = PropsWithChildren & {
  containerClass?: string;
  contentClass?: string;
  darkBackground?: boolean;
  animateOnScroll?: boolean;
};

export function Container({
  children,
  containerClass,
  contentClass,
  darkBackground = false,
  animateOnScroll = false,
}: ContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!animateOnScroll);
  const threshold = 0.1;

  useEffect(() => {
    if (!animateOnScroll || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Animate whenever entering viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [animateOnScroll, threshold]);

  return (
    <div
      ref={containerRef}
      className={`mt-14 md:mt-20 ${contentClass ? contentClass : ''} ${
        darkBackground ? 'bg-background py-14 md:py-20' : ''
      } ${
        animateOnScroll
          ? `transition-translate duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`
          : ''
      }`}
    >
      <div
        className={`container mx-auto px-5 md:px-10 ${containerClass ? containerClass : ''}`}
      >
        {children}
      </div>
    </div>
  );
}
