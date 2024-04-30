import { useRouter } from 'next/router';

import Seo from '@/components/seo/seo';
import { AuthUser } from '@/features/auth';
import storage from '@/utils/storage';
import { LoginForm } from '@/features/auth/components/login-form';

const LoginPage = () => {
  const router = useRouter();

  const onSuccess = (): AuthUser | null => {
    router.replace('/');
    return storage.getUser() || null;
  };

  return (
    <>
      <Seo title="Conduit | Sign In" />
      {/* login form which should redirect to homepage onSuccess */}
      <LoginForm onSuccess={onSuccess} />
    </>
  );
};

export default LoginPage;
