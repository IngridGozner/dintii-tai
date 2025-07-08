import { PropsWithChildren } from "react";

export function ComponentContainer({ children, containerClass, contentClass }: PropsWithChildren & { containerClass?: string; contentClass?: string }) {
    return <div className={`${contentClass ? ' ' + contentClass : ''}`}>
        <div className={`my-2 md:my-4 container${containerClass ? ' ' + containerClass : ''}`}>
            {children}
        </div>
    </div>
}