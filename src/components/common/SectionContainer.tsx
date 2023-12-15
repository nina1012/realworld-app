import clsx from 'clsx';
import { ReactNode } from 'react';

export type SectionContainerProps = {
  children: ReactNode;
  styles?: string;
};

const SectionContainer = ({
  children,
  styles,
  ...props
}: SectionContainerProps) => {
  return (
    <div
      className={clsx(
        styles,
        'px-4  mx-auto w-full md:max-w-[576px] lg:max-w-[720px] xl:max-w-[940px] 2xl:max-w-[1140px]'
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
