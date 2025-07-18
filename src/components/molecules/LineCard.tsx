import { BlockContent } from "@/sanity/types";
import { GoogleIcon } from "../atoms/GoogleIcon";
import { Headline } from "../atoms/Headline";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponents";

type LineCardProps = {
    iconName: string;
    title: string;
    text: BlockContent;
    className?: string;
}

export default function LineCard(props: LineCardProps) {
    const { iconName, title, text, className } = props;

    return (
        <div className={className}>
            <div className="flex flex-row p-5 lg:p-10">
                <div className="bg-white rounded-full p-2">
                    <GoogleIcon iconName={iconName} iconClassName="!text-[7rem] lg:!text-[8rem] text-link" />
                </div>
                <div className="flex flex-col text-white ml-8 lg:ml-18">
                    <Headline headline={title} />
                    <div className="text-base md:text-2xl">
                        <PortableText value={text} components={components} />
                    </div>
                </div>
            </div>
        </div>
    );
}