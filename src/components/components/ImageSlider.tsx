import { GALLERY_QUERYResult } from "@/sanity/types";
import Slider from "../molecules/Slider/Slider";
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image';
import { ComponentContainer } from "../molecules/ComponentContainer";

type ImageSliderProps = {
    headline?: string;
    images: NonNullable<GALLERY_QUERYResult>
};

export default function ImageSlider(props: ImageSliderProps) {
    const { images, headline } = props;
    const values = Object.values(images);
    if (!values || !values.length) return undefined;

    return (
        <ComponentContainer>
            {headline && <h2 className="mb-3">{headline}</h2>}
            <Slider options={{ slidesToScroll: 1, loop: true }}>
                {values.map((item, index) => {
                    const { image } = item;

                    if (image) return (
                        <div key={item._id + index} className="flex items-center justify-center">
                            <Image
                                src={urlFor(image).width(1024).height(576).url()}
                                width={1024}
                                height={576}
                                alt={image.alt || ''}
                                className="rounded-lg aspect-video"
                            />
                        </div>
                    )
                    return;
                }
                )}
            </Slider>
        </ComponentContainer>
    )
}