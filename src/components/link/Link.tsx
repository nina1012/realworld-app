import clsx from 'clsx';
import NextLink from 'next/link';
import { ReactNode } from 'react';

export type LinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

export const Link = ({
  children,
  href,
  className,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      className={clsx('inline-block', className)}
      legacyBehavior
      href={href}
      {...props}
    >
      <a className={className}>{children}</a>
    </NextLink>
  );
};
