import clsx from 'clsx';
import { useRef } from 'react';

import {
  FieldError,
  UseFormRegister,
} from 'react-hook-form';
export type InputFieldProps = {
  type?: 'text' | 'email' | 'password' | 'textarea';
  label?: string;
  error?: FieldError;
  className?: string;
} & Partial<
  ReturnType<UseFormRegister<Record<string, unknown>>>
>;

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    label,
    error,
    className,
    ...inputProps
  } = props;

  const ref = useRef(null);

  return (
    <div className="bg-white mb-4 text-left w-full sm:w-[540px] mx-auto">
      {type === 'textarea' ? (
        <textarea
          rows={8}
          className={clsx(
            'border-[1px] border-gray-200 overflow-hidden  w-full text-xl rounded px-6 py-3',
            className
          )}
          {...inputProps}
          ref={ref}
          placeholder={label}
        ></textarea>
      ) : (
        <input
          className={clsx(
            'border-[1px] border-gray-200 overflow-hidden  w-full text-xl rounded px-6 py-3',
            className
          )}
          type={type}
          placeholder={label}
          {...inputProps}
          ref={ref}
        />
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
};
