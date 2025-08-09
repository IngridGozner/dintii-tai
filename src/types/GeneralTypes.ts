import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from "@/sanity/types";

export type FieldString = { value: string | null };


export type SanityImage = {
    image: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        media?: unknown;
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt?: string;
        _type: "image";
    } | null;
}