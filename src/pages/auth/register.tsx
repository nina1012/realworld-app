import { RegisterForm } from '@/features/auth/components/register-form/register-form';
import { useRouter } from 'next/router';
import Seo from '@/components/seo/seo';
import { AuthUser } from '@/features/auth';
import storage from '@/utils/storage';

const RegisterPage = () => {
  const router = useRouter();
  const onSuccess = (): AuthUser => {
    router.replace('/auth/me');
    return storage.getUser();
  };

  return (
    <>
      <Seo title="Sign up - Conduit" />
      <RegisterForm onSuccess={onSuccess} />
    </>
  );
};

export default RegisterPage;
