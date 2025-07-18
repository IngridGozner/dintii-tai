"use client"

import React, { PropsWithChildren } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './SliderDotButtons'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './SliderButtons'
import useEmblaCarousel from 'embla-carousel-react'

type SliderProps = PropsWithChildren & {
  options?: EmblaOptionsType
}

const Slider: React.FC<SliderProps> = (props) => {
  const { children, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const slides = React.Children.toArray(children);
  if (!slides || !slides.length) return null;

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla max-w-5xl mx-auto relative">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div className="embla__slide flex-none w-full min-w-0" key={index}>
              <div className="embla__slide__number flex">{slide}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls grid grid-cols-[auto_1fr] justify-between gap-5 mt-5">
        <div className="embla__buttons grid grid-cols-2 gap-[0.6rem] items-center">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} aria-label='go to previous' />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} aria-label='go to next' />
        </div>

        <div className="embla__dots flex flex-wrap justify-center items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot inline-flex cursor-pointer border-2 rounded-full w-10 h-4 border-link hover:bg-link-hover hover:border-link-hover'.concat(
                index === selectedIndex ? ' embla__dot--selected border-link bg-link' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Slider
