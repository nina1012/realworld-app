import Spinner from '@/components/common/Spinner';
import { useArticles } from '../../api/get-articles';
import { useRouter } from 'next/router';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import { Conditional } from '@/components/common/Conditional';
import Pagination from '@/components/common/Pagination';
import { usePagination } from '@/stores/pagination';

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
            color={''}
            w={''}
            h={''}
            alignment={'center'}
          />
        </div>
      ) : (
        <>
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
          <Conditional
            condition={
              !!articles?.articles &&
              router.pathname === '/'
            }
          >
            <Pagination
              total={articles?.articles.length || 0}
              articlesPerPage={10}
            />
          </Conditional>
        </>
      )}
    </div>
  );
};

export default ArticleList;
