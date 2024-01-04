import SectionContainer from '@/components/common/SectionContainer';
import Banner from '@/components/homepage/Banner';
import TabList from '@/components/homepage/TabList';
import Seo from '@/components/seo/seo';
import ArticleList from '@/features/articles/components/ArticleList';
import { useUser } from '@/features/auth/api/get-auth-user';
import Tags from '@/features/tags/components/Tags';

export default function Home() {
  const { data } = useUser();

  return (
    <>
      <Seo title="Home - Conduit" />
      <div className="pb-20 md:pb-12">
        <Banner />
        <SectionContainer>
          <div className="flex min-h-screen items-start flex-col md:flex-row mt-6 gap-y-5 md:gap-y-0 md:gap-x-5">
            <div className="w-full flex-[0_0_75%] px-4 h-max">
              <TabList />
              {/* articles go here */}
              <ArticleList />
            </div>
            <Tags />
          </div>
        </SectionContainer>
      </div>
    </>
  );
}
