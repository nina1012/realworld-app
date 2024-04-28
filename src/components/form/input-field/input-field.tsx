import clsx from 'clsx';
import {
  FormEvent,
  ForwardedRef,
  forwardRef,
} from 'react';

import {
  ChangeHandler,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';

export type InputFieldProps = {
  type: 'text' | 'email' | 'password' | 'textarea';
  label?: string;
  id?: string;
  error?: FieldError;
  required?: boolean;
  className?: string;
  autoComplete?: 'true' | 'false';
  onChange?: ((e: FormEvent<HTMLInputElement>) => void) &
    ChangeHandler;
} & Partial<
  ReturnType<UseFormRegister<Record<string, unknown>>>
>;

export const InputField = forwardRef(
  (
    props: InputFieldProps,
    ref: ForwardedRef<
      HTMLInputElement | HTMLTextAreaElement | null
    >
  ) => {
    const {
      type = 'text',
      label,
      required = false,
      className,
      error,
      ...inputProps
    } = props;

    return (
      <div className="bg-white mb-4 text-left w-full">
        {label && (
          <label
            className="block text-gray-500 text-sm font-bold mb-2"
            htmlFor={inputProps.name}
          >
            {label}{' '}
            {required && (
              <span className="text-red-500">*</span>
            )}
          </label>
        )}

        {type === 'textarea' ? (
          <textarea
            className={clsx(
              'border-[1px] border-gray-200 overflow-hidden w-full text-xl rounded px-6 py-3',
              className,
              {
                'border-red-500': error,
              }
            )}
            placeholder={label}
            {...inputProps}
            wrap=""
            rows={8}
            ref={
              ref as ForwardedRef<HTMLTextAreaElement | null>
            }
          ></textarea>
        ) : (
          <input
            className={clsx(
              'border-[1px] border-gray-200 overflow-hidden w-full text-xl rounded px-6 py-3',
              className,
              {
                'border-red-500': error,
              }
            )}
            type={type}
            placeholder={label}
            {...inputProps}
            ref={
              ref as ForwardedRef<HTMLInputElement | null>
            }
          />
        )}

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error.message}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
