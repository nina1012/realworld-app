import Link from 'next/link';
import { APP_NAME } from '@/config/constants';
import clsx from 'clsx';

export type LogoLinkProps = {
  styles?: string;
};

const LogoLink = ({ styles }: LogoLinkProps) => {
  return (
    <Link
      href="/"
      className={clsx(
        styles,
        'font-titillium font-bold text-primary text-shadow-[0px_1px_3px_rgba(0,0,0,0.3)] mb-4 mr-4'
      )}
    >
      {APP_NAME}
    </Link>
  );
};

export default LogoLink;
