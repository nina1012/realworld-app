import SectionContainer from '@/components/common/SectionContainer';
import Seo from '@/components/seo/seo';
import { useUser } from '@/features/auth/api/get-current-user';
import { useLogout } from '@/features/auth/api/logout';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { GoGear } from 'react-icons/go';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { Link } from '@/components/link/link';

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
      <Seo
        title={`Conduit ${
          isPending ? '' : data?.user.username
        }`}
      />
      <div className="w-full bg-zinc-100">
        <SectionContainer styles="text-center">
          <div className="mx-auto p-8">
            <Image
              width={100}
              height={100}
              src={
                data?.user?.image as string | StaticImport
              }
              alt={data?.user?.username || ''}
              className="rounded-full mx-auto mb-4"
            />
            <p className="text-2xl font-bold">
              {data?.user.username}
            </p>
            <Link
              className="flex items-center ml-auto justify-end px-2 py-1 rounded-sm gap-1 max-w-fit border-neutral-400 border-[1px] text-sm  text-neutral-400 hover:bg-neutral-500/20"
              icon={<GoGear />}
              href="/auth/settings"
            >
              Edit Profile Settings
            </Link>
          </div>
        </SectionContainer>
      </div>
      <SectionContainer>
        <div className="flex min-h-screen items-start flex-col md:flex-row mt-6 gap-y-5 md:gap-y-0 md:gap-x-5">
          <div className="w-full px-4 h-max">
            {/* articles go here */}
            <div> Articles go here...</div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default MePage;
