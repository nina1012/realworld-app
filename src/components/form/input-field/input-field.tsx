import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

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

export const InputField = forwardRef(
  (
    props: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const {
      type = 'text',
      label,
      className,
      error,
      ...inputProps
    } = props;

    return (
      <div className="bg-white mb-4 text-left w-full">
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
        {error && <div>{error.message}</div>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
