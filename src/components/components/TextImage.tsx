import { ARTICLE_SLUG_QUERYResult } from "@/sanity/types";
import { Container, ContainerProps } from "../molecules/Container";
import { GridContainer } from "../molecules/GridContainer";
import { Headline, HeadlineProps } from "../atoms/Headline";
import Image from 'next/image'
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponents";

type TextImageProps = Partial<HeadlineProps> & ContainerProps & {
    article: NonNullable<ARTICLE_SLUG_QUERYResult>;
    imagePosition?: 'left' | 'right';
}

export default function TextImage(props: TextImageProps) {
    const { article, imagePosition = 'left', darkBackground, containerClass, contentClass, headline, ...rest } = props;

    const { title, image, body } = article;
    const imagePositionedRight = imagePosition === 'right';

    const textBody = body && body.value && (
        <div className={`text-xl leading-8 ${image ? `mt-4 md:mt-0 md:w-1/2 ${imagePositionedRight ? 'md:mr-10' : 'md:ml-10'}` : ''}`}>
            <PortableText value={body.value} components={components} />
        </div>
    )

    return (
        <Container darkBackground={darkBackground} containerClass={containerClass} contentClass={contentClass}>
            <GridContainer>
                <div className={image ? "col-span-6 md:col-span-12 md:col-start-2" : "col-span-6 md:col-start-3 md:col-span-7"}>
                    {title && title.value && <Headline headline={headline || title.value} {...rest} />}
                    <div className='flex flex-col md:flex-row'>
                        {imagePositionedRight && textBody}
                        {image && (
                            <div className="md:w-1/3">
                                <Image
                                    src={urlFor(image).width(800).height(800).url()}
                                    alt={image?.alt || ''}
                                    width={800}
                                    height={800}
                                    className='aspect-video object-cover w-full h-full'
                                />
                            </div>
                        )}
                        {!imagePositionedRight && textBody}
                    </div>
                </div>
            </GridContainer>
        </Container >
    );
}   