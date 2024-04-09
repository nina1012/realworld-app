import Spinner from '@/components/common/Spinner';
import { useArticles } from '../../api/get-articles';
import { useRouter } from 'next/router';
import ArticlePreview from '../ArticlePreview/ArticlePreview';

const ArticleList = () => {
  const router = useRouter();
  const { query } = router;

  const tag = query.tag as string;
  const author = query.username as string;

  const { articles, isLoading } = useArticles(
    tag,
    author
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
      )}
    </div>
  );
};

export default ArticleList;
