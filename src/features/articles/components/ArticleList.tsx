import Spinner from '@/components/common/Spinner';
import { useArticles } from '../api/get-articles';
import { useRouter } from 'next/router';
import ArticlePreview from './ArticlePreview';
import { Conditional } from '@/components/common/Conditional';
import Pagination from '@/components/common/Pagination';
import { usePagination } from '@/stores/pagination';
import { demoArticles } from '../demoData';
import { GoInfo } from 'react-icons/go';

const ArticleList = () => {
  const router = useRouter();
  const { query } = router;

  const tag = query.tag as string;
  const author = query.username as string;

  const { currentPage: page } = usePagination();
  const { articles, isLoading } = useArticles(
    tag,
    author,
    page
  );

  return (
    <div className="mb-12 flex h-full flex-col justify-center">
      {isLoading ? (
        <div className="h-[calc(100vh/2)] flex justify-center items-center">
          <Spinner
            color="primary"
            w="32"
            h="32"
            alignment="center"
          />
        </div>
      ) : (
        <>
          {articles === demoArticles && (
            <div className="banner my-2 flex gap-2 items-center justify-center bg-red-100 text-red-800 p-4 rounded-md shadow-md mb-4">
              <GoInfo size={20} />
              <p className="text-sm font-medium">
                You&apos;re viewing sample articles as the
                service is temporarily unavailable.
              </p>
            </div>
          )}
          {articles?.articlesCount ? (
            <div className="mb-12">
              {articles?.articles?.map((article) => {
                return (
                  <ArticlePreview
                    article={article}
                    key={article.slug}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-red-600 text-lg my-5">
              No articles are here, yet... 😕
            </div>
          )}

          {/* only show pagination on homepage / */}
          <Conditional
            condition={
              !!articles?.articles &&
              router.pathname === '/'
            }
          >
            <Pagination
              total={articles?.articlesCount || 0}
              articlesPerPage={10}
            />
          </Conditional>
        </>
      )}
    </div>
  );
};

export default ArticleList;
