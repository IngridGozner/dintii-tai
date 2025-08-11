export type InputProps = {
    label: string;
    element: string;
    type: string;
}

export function Input(props: InputProps) {
    const { label, element, type } = props;

    return (
        <div className="relative">
            <input id={element} type={type} name={element} className="peer w-full border-b placeholder:text-transparent bg-white p-3 rounded-lg min-w-72" placeholder="name" />
            <label htmlFor={element} className="absolute left-0 ml-3 -translate-y-6 peer-focus:text-white text-white duration-200 ease-linear peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:text-gray-500 peer-focus:ml-3 peer-focus:-translate-y-6 cursor-text">
                {label}
            </label>
        </div>
    )
}