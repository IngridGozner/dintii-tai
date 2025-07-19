export default function BurgerMenu({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) {
    const commmonLineClasses = "h-0.5 w-8 bg-link hover:bg-link-hover transition duration-300 ease-in-out";

    return (
        <button
            onClick={toggle}
            className="flex flex-col w-8 h-8 space-y-1.5 md:hidden cursor-pointer mt-7"
            aria-label="Toggle menu"
        >
            <span
                className={`${commmonLineClasses} transform ${isOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
            />
            <span
                className={`${commmonLineClasses} ${isOpen ? 'opacity-0' : ''
                    }`}
            />
            <span
                className={`${commmonLineClasses} transform ${isOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
            />
        </button>
    );
}
