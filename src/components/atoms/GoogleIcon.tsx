export type GoogleIconProps = {
  iconName: string;
  iconClassName?: string;
  ariaLabel?: string;
};

export function GoogleIcon({
  iconName,
  iconClassName,
  ariaLabel,
}: GoogleIconProps) {
  return (
    <span
      className={`material-icons${iconClassName ? ` ${iconClassName}` : ''}`}
      aria-label={ariaLabel}
    >
      {iconName}
    </span>
  );
}
