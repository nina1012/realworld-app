import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

export type NavLinkProps = {
  href: string;
  children: ReactNode;
  isActive?: boolean;
  as?: string;
  className?: string;
  onClick?: () => void;
  icon?: ReactNode | null;
};

const NavLink = ({
  href,
  children,
  isActive,
  icon,
  ...props
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        isActive ? '!text-gray-700' : '!text-gray-300',
        'ml-4 hover:text-gray-500 transition-colors flex items-center gap-1'
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </Link>
  );
};

export default NavLink;
