export default function BurgerMenu({
  isOpen,
  toggle,
  variant = 'light',
  className,
}: {
  isOpen: boolean;
  toggle: () => void;
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const isDarkVariant = variant == 'dark';
  const commmonLineClasses = `h-0.5 w-8 bg-link hover:bg-link-hover transition duration-300 ease-in-out ${isDarkVariant ? 'bg-white' : ''}`;

  return (
    <button
      onClick={toggle}
      className={`mt-7 flex h-8 w-8 cursor-pointer flex-col space-y-1.5 md:hidden ${className ? className : ''}`}
      aria-label='Toggle menu'
    >
      <span
        className={`${commmonLineClasses} transform ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
      />
      <span className={`${commmonLineClasses} ${isOpen ? 'opacity-0' : ''}`} />
      <span
        className={`${commmonLineClasses} transform ${
          isOpen ? '-translate-y-2 -rotate-45' : ''
        }`}
      />
    </button>
  );
}
