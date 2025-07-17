import { PropsWithChildren } from "react";

export function ComponentContainer({ children, containerClass, contentClass }: PropsWithChildren & { containerClass?: string; contentClass?: string }) {
    return <div className={`mt-14 md:mt-20${contentClass ? ` ${contentClass}` : ''}`}>
        <div className={`mx-auto px-5 md:px-10 container${containerClass ? ' ' + containerClass : ''}`}>
            {children}
        </div>
    </div>
}