import { GoogleIcon, GoogleIconProps } from './GoogleIcon';

export type ButtonProps = Partial<GoogleIconProps> & {
  className?: string;
  label?: string;
  onClick?: () => void;
  href?: string;
  asLink?: boolean;
  type?: 'button' | 'submit';
  formAction?: (formData: FormData) => Promise<void>;
};

export function Button({
  className,
  label,
  onClick,
  href,
  iconName,
  iconClassName,
  asLink,
  formAction,
  type,
}: ButtonProps) {
  const buttonClasses = `flex items-center cursor-pointer ${
    asLink
      ? 'text-link hover:text-link-hover'
      : 'justify-center bg-link border-2 py-2 px-4 text-white hover:bg-link-hover rounded-lg'
  } ${className ? ` ${className}` : ''}`;

  const buttonContent = (
    <>
      {iconName && (
        <GoogleIcon iconName={iconName} iconClassName={iconClassName} />
      )}
      <span className={iconName && 'ml-2'}>{label ? label : ''}</span>
    </>
  );

  return href ? (
    <a href={href} className={buttonClasses} onClick={onClick}>
      {buttonContent}
    </a>
  ) : (
    <button
      className={buttonClasses}
      onClick={onClick}
      formAction={formAction}
      type={type}
    >
      {buttonContent}
    </button>
  );
}
