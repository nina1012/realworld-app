import Spinner from '@/components/common/Spinner';
import Seo from '@/components/seo/seo';
import { useArticle } from '@/features/articles/api/get-article';
import { useRouter } from 'next/router';
import { CustomLink } from '@/components/common/CustomLink';
import SectionContainer from '@/components/common/SectionContainer';
import ArticleMeta from '@/features/articles/components/ArticleMeta';
import { marked } from 'marked';
import Tags from '@/features/tags/components/Tags';

const ArticlePage = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { data, isLoading } = useArticle(slug as string);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner
          color={''}
          w={'80'}
          h={'80'}
          alignment={'center'}
        />
      </div>
    );
  }
  if (!data) return;

  if (!data && !isLoading) {
    return (
      <div>
        <Seo title={`Conduit`} />
        <p>No article found.</p>
        <CustomLink href={'/'} className="button ">
          Back to home
        </CustomLink>
      </div>
    );
  }

  const articleBody = {
    __html: marked(data.article.body),
  };

  return (
    <>
      <Seo
        title={`Conduit  ${
          isLoading ? '' : '| ' + data?.article.title
        }`}
      />

      <div className="h-full">
        {/* banner */}
        <div className="banner w-full text-white bg-zinc-800 ">
          <SectionContainer styles="text-left">
            <div className="py-8">
              <h1
                style={{
                  textShadow:
                    '0px 1px 3px rgba(0, 0, 0, 0.3) ',
                }}
                className="text-4xl leading-10 md:text-5xl md:leading-normal font-titillium font-bold text-shadow-[0px_1px_3px_rgba(0,0,0,0.3)] mb-4"
              >
                {data?.article.title}
              </h1>
              <ArticleMeta article={data?.article} />
            </div>
          </SectionContainer>
        </div>
        <div className="container page mt-6">
          <div className="article-content sm:text-lg">
            <div
              className="mb-8"
              dangerouslySetInnerHTML={articleBody}
            />
            <Tags articleTags={data.article.tagList} />
          </div>
        </div>
        <hr className="container my-8" />
        {/* comments go here... */}
      </div>
    </>
  );
};

export default ArticlePage;
