import { urlFor } from "@/sanity/lib/image";
import { STAGE_QUERYResult } from "@/sanity/types"
import Image from 'next/image'
import { GridContainer } from "../molecules/GridContainer";

export default function Stage(props: NonNullable<STAGE_QUERYResult>) {
    const { motto, stageImage, name, profession } = props;

    if (!stageImage || !stageImage.image) return null;

    return (
        <GridContainer>
            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[500px] col-span-6 md:col-span-12">
                {motto && (
                    <div className="absolute inset-0 grid md:grid-cols-2 grid-cols-1 z-10 md:items-center items-end">
                        <div className="bg-link/50 p-3 lg:p-12">
                            <h1 className="text-3xl lg:text-7xl text-white text-shadow-lg font-[Architects_Daughter]">
                                {motto.value}
                            </h1>
                            <div className="lg:ml-5 mt-0 lg:mt-4 text-white text-base lg:text-2xl">{name} | {profession?.value}</div>
                        </div>
                    </div>
                )}
                <Image
                    src={urlFor(stageImage?.image).width(3000).height(1000).url()}
                    alt={stageImage?.image?.alt || ''}
                    fill
                    className="object-cover w-full h-full"
                />
            </div>
        </GridContainer>
    )
}