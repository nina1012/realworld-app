import { MouseEventHandler, ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export type ButtonProps = {
  children: string | ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isdisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
  className: string;
  variant?: 'solid' | 'outline';
};

export const Button = ({
  children,
  type = 'button',
  variant,
  className,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9 }}
      className={clsx(
        `
      ${
        variant === 'solid'
          ? 'bg-primary text-white border-transparent hover:bg-primary/80'
          : 'bg-transparent border-primary  text-primary hover:bg-primary hover:text-white'
      }
 px-4 py-2 cursor-pointer border-[1px] rounded-md flex justify-center gap-1 items-center min-w-[100px] transition-all`,
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
};
