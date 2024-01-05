import { useRouter } from 'next/router';

import Seo from '@/components/seo/seo';
import { AuthUser } from '@/features/auth';
import storage from '@/utils/storage';
import { LoginForm } from '@/features/auth/components/login-form/login-form';

const LoginPage = () => {
  const router = useRouter();

  const onSuccess = (): AuthUser => {
    router.replace('/auth/me');
    return storage.getUser() || null;
  };

  return (
    <>
      <Seo title="Sign In - Conduit" />
      {/* login form which should redirect to homepage onSuccess */}
      <LoginForm onSuccess={onSuccess} />
    </>
  );
};

export default LoginPage;
