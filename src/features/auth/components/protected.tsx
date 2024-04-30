import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import Spinner from '@/components/common/Spinner';
import { useUser } from '../api/get-current-user';
export type ProtectedProps = { children: ReactNode };
export const Protected = ({
  children,
}: ProtectedProps) => {
  const { replace, asPath } = useRouter();
  const user = useUser();
  useEffect(() => {
    if (!user.data && !user.isPending) {
      replace(
        `/auth/login?redirect=${asPath}`,
        undefined,
        { shallow: true }
      );
    }
  }, [user, asPath, replace]);
  if (user.isPending) {
    return (
      <>
        {' '}
        <Spinner
          color="primary"
          w="32"
          h="32"
          alignment="center"
        />
      </>
    );
  }
  if (!user.data && !user.isPending) return null;
  return <>{children}</>;
};
