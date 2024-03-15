import Link from 'next/link';
import { ReactNode } from 'react';

export type CustomLinkProps = {
  href: string;
  as?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export const CustomLink = ({
  href,
  as,
  className,
  children,
}: CustomLinkProps) => {
  return (
    <Link href={href} as={as} legacyBehavior>
      <a className={className}>{children}</a>
    </Link>
  );
};
