import Seo from '@/components/seo/seo';
import { AuthUser } from '@/features/auth';
import { useUser } from '@/features/auth/api/get-auth-user';
import storage from '@/utils/storage';

const MePage = () => {
  const { data } = useUser();
  return (
    <>
      <Seo title={`${data?.user.username}`} />
      <h1>Currently logged user</h1>
    </>
  );
};

export default MePage;
