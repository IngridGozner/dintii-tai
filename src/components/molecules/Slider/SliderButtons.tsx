"use client"

import React, {
    ComponentPropsWithRef,
    useCallback,
    useEffect,
    useState
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { GoogleIcon } from '@/components/atoms/GoogleIcon'

type UsePrevNextButtonsType = {
    prevBtnDisabled: boolean
    nextBtnDisabled: boolean
    onPrevButtonClick: () => void
    onNextButtonClick: () => void
}

export const usePrevNextButtons = (
    emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onSelect])

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    }
}

type PropType = ComponentPropsWithRef<'button'>
const buttonClassName = "bg-white absolute top-[35%] md:top-[40%] lg:top-[45%] cursor-pointer z-10 w-12 aspect-square border-2 border-link hover:border-link-hover text-link hover:text-link-hover flex items-center justify-center"

export const PrevButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props

    return (
        <button
            className={`embla__button embla__button--prev left-0 border-l-0 ${buttonClassName}`}
            type="button"
            {...restProps}
        >
            <GoogleIcon iconName="arrow_back_ios" iconClassName='ml-2 !text-2xl' />
            {children}
        </button>
    )
}

export const NextButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props

    return (
        <button
            className={`embla__button embla__button--next right-0 border-r-0 ${buttonClassName}`}
            type="button"
            {...restProps}
        >
            <GoogleIcon iconName="arrow_forward_ios" iconClassName='!text-2xl' />
            {children}
        </button>
    )
}
