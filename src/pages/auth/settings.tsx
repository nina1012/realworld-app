import { useRouter } from 'next/router';
import Seo from '@/components/seo/seo';
import { AuthUser } from '@/features/auth';
import storage from '@/utils/storage';
import { SettingsForm } from '@/features/auth/components/settings-form';
import { Protected } from '@/features/auth/components/protected';

const RegisterPage = () => {
  const router = useRouter();
  const onSuccess = (): AuthUser | null => {
    router.replace('/auth/me');
    return storage.getUser() || null;
  };

  return (
    <>
      <Protected>
        <Seo title="Conduit | Your Settings" />
        <SettingsForm onSuccess={onSuccess} />
      </Protected>
    </>
  );
};

export default RegisterPage;
