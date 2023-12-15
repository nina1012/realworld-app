import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

export type NavLinkProps = {
  href: string;
  children: ReactNode;
  isActive?: boolean;
  as?: string;
  className?: string;
};

const NavLink = ({
  href,
  children,
  isActive,
  ...props
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        isActive ? 'text-gray-700' : 'text-gray-300',
        'mx-2 hover:text-gray-500  transition-colors'
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
