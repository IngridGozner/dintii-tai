'use client';

import React, { PropsWithChildren } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './SliderDotButtons';
import { PrevButton, NextButton, usePrevNextButtons } from './SliderButtons';
import useEmblaCarousel from 'embla-carousel-react';

type SliderProps = PropsWithChildren & {
  options?: EmblaOptionsType;
};

const Slider: React.FC<SliderProps> = (props) => {
  const { children, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const slides = React.Children.toArray(children);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  if (!slides || !slides.length) return null;

  return (
    <section className='embla relative mx-auto max-w-5xl'>
      <div className='embla__viewport overflow-hidden' ref={emblaRef}>
        <div className='embla__container flex'>
          {slides.map((slide, index) => (
            <div className='embla__slide w-full min-w-0 flex-none' key={index}>
              <div className='embla__slide__number flex'>{slide}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='embla__controls mt-5 grid grid-cols-[auto_1fr] justify-between gap-5'>
        <div className='embla__buttons grid grid-cols-2 items-center gap-[0.6rem]'>
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            aria-label='go to previous'
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            aria-label='go to next'
          />
        </div>

        <div className='embla__dots flex flex-wrap items-center justify-center gap-2'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot border-link hover:bg-link-hover hover:border-link-hover inline-flex h-4 w-10 cursor-pointer rounded-full border-2'.concat(
                index === selectedIndex
                  ? 'embla__dot--selected border-link bg-link'
                  : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
