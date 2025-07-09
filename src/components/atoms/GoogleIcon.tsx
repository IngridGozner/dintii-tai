export type GoogleIconProps = {
    iconName: string;
    iconClassName?: string;
}

export function GoogleIcon({ iconName, iconClassName }: GoogleIconProps) {
    return <span className={`material-icons${iconClassName ? ` ${iconClassName}` : ''}`}>{iconName}</span>
}