import SectionContainer from '@/components/common/SectionContainer';
import Seo from '@/components/seo/seo';
import { useUser } from '@/features/auth/api/get-current-user';
import { useLogout } from '@/features/auth/api/logout';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { GoGear } from 'react-icons/go';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Link } from '@/components/link/Link';
import TabList from '@/components/homepage/TabList';
import { useFeedArticles } from '@/features/articles/api/get-feed-articles';
import Spinner from '@/components/common/Spinner';
import ArticlePreview from '@/features/articles/components/ArticlePreview';
import { usePagination } from '@/stores/pagination';
import { Protected } from '@/features/auth/components/protected';

const MePage = () => {
  const { data, isPending } = useUser();

  const router = useRouter();
  const { currentPage: page } = usePagination();
  const { submit: logout } = useLogout({
    onSuccess: () => {
      // Redirect to the home page after logout
      router.replace('/');
    },
  });

  const handleLogout = () => {
    logout();
  };

  const { feed, isLoadingFeed } = useFeedArticles(page);

  return (
    <Protected>
      <Seo
        title={`Conduit ${
          isPending ? '' : '| ' + data?.user.username
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
            <TabList />
            {isLoadingFeed ? (
              <div className="h-[calc(100vh/2)] flex justify-center items-center">
                <Spinner
                  color="primary"
                  w="32"
                  h="32"
                  alignment="center"
                />
              </div>
            ) : (
              <div className="mb-12">
                {feed?.articlesCount ? (
                  feed?.articles?.map((article) => {
                    return (
                      <ArticlePreview
                        article={article}
                        key={article.slug}
                      />
                    );
                  })
                ) : (
                  <div className="flex flex-col gap-4 my-5 mb-10">
                    <p className="text-red-600 text-lg">
                      No articles are here, yet... 😕
                    </p>
                    <p>
                      In order to find articles on feed,
                      you need to follow profiles
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </SectionContainer>
    </Protected>
  );
};

export default MePage;
