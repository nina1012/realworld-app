import { Button } from '@/components/button';
import Seo from '@/components/seo/seo';
import { useUser } from '@/features/auth/api/get-current-user';
import { useLogout } from '@/features/auth/api/logout';
import { useRouter } from 'next/router';

const MePage = () => {
  const { data, isPending } = useUser();
  const router = useRouter();
  const { submit: logout } = useLogout({
    onSuccess: () => {
      // Redirect to the home page after logout
      router.replace('/');
    },
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Seo title={`${data?.user.username}`} />
      <h1>Currently logged user</h1>
      <Button
        type="button"
        className="text-red-400 border-red-400 hover:bg-red-400"
        variant="outline"
        onClick={handleLogout}
        isdisabled={isPending}
      >
        Log out
      </Button>
    </>
  );
};

export default MePage;
