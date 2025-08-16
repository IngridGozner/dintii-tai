export type InputProps = {
  label: string | null;
  element: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  readOnly?: boolean;
  className?: string;
  containerClassName?: string;
};

export function Input(props: InputProps) {
  const {
    label = '',
    element,
    type = 'text',
    required = false,
    readOnly = false,
    defaultValue,
    className,
    containerClassName,
  } = props;

  return (
    <div className={`relative ${containerClassName || ''}`}>
      <input
        id={element}
        type={type}
        name={element}
        className={`peer w-full min-w-72 rounded-lg border-b bg-white p-3 placeholder:text-transparent ${className ?? ''}`}
        placeholder='name'
        required={required}
        autoComplete={element}
        readOnly={readOnly}
        defaultValue={defaultValue}
      />
      {type != 'hidden' && (
        <label
          htmlFor={element}
          className='absolute left-0 ml-3 -translate-y-6 cursor-text text-white duration-200 ease-linear peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:text-gray-500 peer-focus:ml-3 peer-focus:-translate-y-6 peer-focus:text-white'
        >
          {label}
        </label>
      )}
    </div>
  );
}
