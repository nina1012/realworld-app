import { useRouter } from 'next/router';
import Seo from '@/components/seo/seo';
import { AuthUser } from '@/features/auth';
import storage from '@/utils/storage';
import { SettingsForm } from '@/features/auth/components/settings-form';

const RegisterPage = () => {
  const router = useRouter();
  const onSuccess = (): AuthUser | null => {
    router.replace('/auth/me');
    return storage.getUser() || null;
  };

  return (
    <>
      <Seo title="Conduit | Your Settings" />
      <SettingsForm onSuccess={onSuccess} />
    </>
  );
};

export default RegisterPage;
