import Spinner from '@/components/common/Spinner';
import Seo from '@/components/seo/seo';
import { useArticle } from '@/features/articles/api/get-article';
import { useRouter } from 'next/router';
import { CustomLink } from '@/components/common/CustomLink';
import SectionContainer from '@/components/common/SectionContainer';
import ArticleMeta from '@/features/articles/components/ArticleMeta';
import { marked } from 'marked';
import Tags from '@/features/tags/components/Tags';
import { useComments } from '@/features/comments/api/get-comments';
import CommentList from '@/features/comments/components/CommentList';
import { ArticleType } from '@/features/articles';

const ArticlePage = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { data, isLoading } = useArticle(slug as string);
  const { comments, isLoading: isLoadingComments } =
    useComments(slug as string);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner
          color={'primary'}
          w={'80'}
          h={'80'}
          alignment={'center'}
        />
      </div>
    );
  }

  if (!data && !isLoading) {
    return (
      <>
        <Seo title={`Conduit`} />
        <div className="min-h-[85vh] flex justify-center items-center">
          <SectionContainer styles="text-center">
            <h1 className="text-2xl">
              No article found.
            </h1>
            <CustomLink
              href={'/'}
              className="button text-primary hover:underline"
            >
              Back to home
            </CustomLink>
          </SectionContainer>
        </div>
      </>
    );
  }

  const articleBody = {
    __html: marked(data?.article?.body as string),
  };

  return (
    <>
      <Seo
        title={`Conduit  ${
          isLoading ? '' : '| ' + data?.article.title
        }`}
      />

      <div className="min-h-screen">
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
              <ArticleMeta
                article={
                  data?.article as ArticleType['article']
                }
              />
            </div>
          </SectionContainer>
        </div>
        {/* Body and tags */}
        <div className="container page mt-6">
          <div className="article-content sm:text-lg">
            <div
              className="mb-8"
              dangerouslySetInnerHTML={articleBody}
            />
            <Tags articleTags={data?.article.tagList} />
          </div>
        </div>
        <hr className="container my-8" />
        {/* comments go here... */}
        {isLoadingComments ? (
          <Spinner
            color="primary"
            w="32"
            h="32"
            alignment="center"
          />
        ) : (
          <CommentList />
        )}
      </div>
    </>
  );
};

export default ArticlePage;
