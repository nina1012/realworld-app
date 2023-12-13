import { MouseEventHandler, ReactNode } from 'react';

export type ButtonProps = {
  children: string | ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
  className: string;
  variant?: 'solid' | 'outline';
};

export const Button = ({
  children,
  variant,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
      ${
        variant === 'solid'
          ? 'bg-primary text-white border-transparent hover:bg-primary/80'
          : 'bg-transparent border-primary  text-primary hover:bg-primary hover:text-white'
      }
 px-4 py-2 cursor-pointer border-[1px] rounded-md flex justify-center items-center min-w-[100px] transition-all`}
      {...props}
    >
      {children}
    </button>
  );
};
