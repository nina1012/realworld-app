import { RegisterForm } from '@/features/auth/components/register-form/register-form';
import { useRouter } from 'next/router';
import Seo from '@/components/seo/seo';
import { AuthUser, RegisterData } from '@/features/auth';
import storage from '@/utils/storage';

const RegisterPage = () => {
  const router = useRouter();
  const onSuccess = (): AuthUser | null => {
    router.replace('/auth/me');
    return storage.getUser() || null;
  };

  return (
    <>
      <Seo title="Sign up - Conduit" />
      <RegisterForm onSuccess={onSuccess} />
    </>
  );
};

export default RegisterPage;
