export type InputProps = {
  label: string | null;
  element: string;
  type?: string;
  required?: boolean;
};

export function Input(props: InputProps) {
  const { label = '', element, type = 'text', required = false } = props;

  return (
    <div className='relative'>
      <input
        id={element}
        type={type}
        name={element}
        className='peer w-full min-w-72 rounded-lg border-b bg-white p-3 placeholder:text-transparent'
        placeholder='name'
        required={required}
        autoComplete={element}
      />
      <label
        htmlFor={element}
        className='absolute left-0 ml-3 -translate-y-6 cursor-text text-white duration-200 ease-linear peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:text-gray-500 peer-focus:ml-3 peer-focus:-translate-y-6 peer-focus:text-white'
      >
        {label}
      </label>
    </div>
  );
}
