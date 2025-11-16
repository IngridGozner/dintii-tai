import { PropsWithChildren, Ref } from 'react';

export type InputProps = PropsWithChildren & {
  label: string | null;
  labelClassName?: string;
  element: string;
  type?: string;
  required?: boolean;
  value?: string | number;
  readOnly?: boolean;
  className?: string;
  containerClassName?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
};

export function Input(props: InputProps) {
  const {
    label = '',
    element,
    type = 'text',
    required = false,
    readOnly = false,
    value,
    className,
    containerClassName,
    autoComplete,
    labelClassName,
    onChange,
    children,
    ref,
  } = props;

  const isCheckbox = type === 'checkbox';

  const checkboxStylesInput = 'w-fit mr-3';
  const checkboxStylesLabel = 'text-white';

  return (
    <div className={`relative ${containerClassName || ''}`}>
      <input
        id={element}
        type={type}
        name={element}
        className={`${isCheckbox ? checkboxStylesInput : `peer w-full min-w-72 rounded-lg border border-gray-500 bg-white p-3 placeholder:text-transparent`} ${className ?? ''}`}
        placeholder='name'
        required={required}
        autoComplete={autoComplete ?? 'off'}
        readOnly={readOnly}
        defaultValue={value}
        ref={ref}
        onChange={onChange}
        {...(isCheckbox && Boolean(value) === true
          ? { defaultChecked: true }
          : {})}
      />
      {children}
      {type != 'hidden' && (
        <label
          htmlFor={element}
          className={`${isCheckbox ? checkboxStylesLabel : `absolute left-0 mt-[2px] ml-3 -translate-y-6 cursor-text text-white duration-200 ease-linear peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:text-gray-500 peer-focus:ml-3 peer-focus:-translate-y-6 peer-focus:text-white ${labelClassName ?? ''}`}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
