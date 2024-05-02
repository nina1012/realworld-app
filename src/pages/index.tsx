import SectionContainer from '@/components/common/SectionContainer';
import Banner from '@/components/homepage/Banner';
import TabList from '@/components/homepage/TabList';
import Seo from '@/components/seo/seo';
import ArticleList from '@/features/articles/components/ArticleList';
import Tags from '@/features/tags/components/Tags';

export default function Home() {
  return (
    <>
      <Seo title="Home - Conduit" />
      <div className="pb-20 md:pb-12">
        <Banner />
        <SectionContainer styles="">
          <div className="min-h-screen mt-6 grid grid-cols-1 lg:grid-cols-[75%_25%] items-start">
            <div className="w-full h-max lg:pr-14">
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
