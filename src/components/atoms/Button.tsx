import { GoogleIcon, GoogleIconProps } from "./GoogleIcon";

type ButtonProps = Partial<GoogleIconProps> & {
    className?: string;
    label?: string;
    onClick?: () => void;
    href?: string;
}

export function Button({ className, label, onClick, href, iconName, iconClassName }: ButtonProps) {
    const buttonClasses = `py-2 px-3 border-base-dark border-2 flex items-center bg-white${className ? ` ${className}` : ''}`;

    const buttonContent = <>{iconName && <GoogleIcon iconName={iconName} iconClassName={iconClassName} />}<span className={iconName && "ml-2"}>{label ? label : ''}</span></>

    return href ?
        <a href={href} className={buttonClasses}>
            {buttonContent}
        </a> :
        <button className={buttonClasses} onClick={onClick}>
            {buttonContent}
        </button>
}