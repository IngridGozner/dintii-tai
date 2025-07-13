import { PropsWithChildren } from "react";

export function ComponentContainer({ children, containerClass, contentClass }: PropsWithChildren & { containerClass?: string; contentClass?: string }) {
    return <div className={`mt-4 md:mt-8${contentClass ? ' ' + contentClass : ''}`}>
        <div className={`mx-auto px-5 md:px-10 container${containerClass ? ' ' + containerClass : ''}`}>
            {children}
        </div>
    </div>
}