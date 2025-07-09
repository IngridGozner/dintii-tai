import { PropsWithChildren } from "react";

export function ComponentContainer({ children, containerClass, contentClass }: PropsWithChildren & { containerClass?: string; contentClass?: string }) {
    return <div className={`${contentClass ? ' ' + contentClass : ''}`}>
        <div className={`mx-2 md:mx-4 container${containerClass ? ' ' + containerClass : ''}`}>
            {children}
        </div>
    </div>
}