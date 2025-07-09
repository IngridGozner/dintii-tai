import { PropsWithChildren } from "react";

export function GridContainer(props: PropsWithChildren) {
    return <div className="grid grid-cols-6 gap-x-2 md:gap-x-4 md:grid-cols-12 gap-y-4">{props.children}</div>
}