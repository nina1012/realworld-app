import SectionContainer from '@/components/common/SectionContainer';
import Spinner from '@/components/common/Spinner';
import { Link } from '@/components/link/link';
import Seo from '@/components/seo/seo';
import { useProfile } from '@/features/profiles/api/get-profile';
import ProfileTab from '@/features/profiles/components/ProfileTab';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HiHome } from 'react-icons/hi2';

export default function ProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const { profile, isLoading } = useProfile(
    username as string
  );

  if (!profile && !isLoading) {
    return (
      <>
        <Seo title={`Conduit`} />
        <div className="w-full bg-slate-50">
          <SectionContainer styles="text-center">
            <div className="flex flex-col justify-center items-center min-h-[90vh]">
              <h2 className="font-semibold text-3xl">
                404 Profile Not Found
              </h2>
              <Link
                href="/"
                className="text-primary hover:underline transition-all"
              >
                Go back to home
              </Link>
            </div>
          </SectionContainer>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo
        title={`Conduit ${
          profile ? ' | ' + username : ''
        }`}
      />
      <div className="w-full bg-zinc-100">
        <SectionContainer styles="text-center">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[90vh]">
              <Spinner
                color={''}
                w={''}
                h={''}
                alignment={'center'}
              />
            </div>
          ) : (
            <>
              <div className="mx-auto p-8">
                <Image
                  width={100}
                  height={100}
                  src={
                    profile?.profile.image as
                      | string
                      | StaticImport
                  }
                  alt={profile?.profile.username || ''}
                  className="rounded-full mx-auto mb-4"
                />
                <h4 className="text-2xl mb-4 font-bold">
                  {profile?.profile.username}
                </h4>
                <p className="mb-4 text-zinc-400 max-w-[450px] text-center mx-auto">
                  {profile?.profile.bio}
                </p>
              </div>
            </>
          )}
        </SectionContainer>
      </div>
      <SectionContainer>
        <div className="flex min-h-screen items-start flex-col md:flex-row mt-6 gap-y-5 md:gap-y-0 md:gap-x-5">
          <div>
            {profile && (
              <ProfileTab profile={profile?.profile} />
            )}
            <div> Articles go here...</div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
