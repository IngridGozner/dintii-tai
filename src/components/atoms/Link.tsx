import { GoogleIcon, GoogleIconProps } from "./GoogleIcon";
import NextLink from 'next/link';

type LinkProps = Partial<GoogleIconProps> & {
    className?: string;
    label?: string;
    onClick?: () => void;
    href: string;
    darkBackground?: boolean;
}

export function Link({ className, label, onClick, href, iconName, iconClassName, darkBackground = false }: LinkProps) {
    const linkClsses = `${darkBackground ? 'text-white hover:text-white' : 'text-link hover:!text-link-hover'} flex items-center${className ? ` ${className}` : ''}`;

    const linkContent = <>{iconName && <GoogleIcon iconName={iconName} iconClassName={iconClassName} />}<span className={`hover:underline hover:underline-offset-4 ${iconName && " ml-2"}`}>{label ? label : ''}</span></>

    return <NextLink className={linkClsses} onClick={onClick} href={href}>
        {linkContent}
    </NextLink>
}