import Spinner from '@/components/common/Spinner';
import { useAllArticles } from '../api/get-all-articles';
import { useRouter } from 'next/router';
import ArticlePreview from './ArticlePreview';

const ArticleList = () => {
  const router = useRouter();
  const { query } = router;

  const tag = query.tag as string;
  const author = query.username as string;

  const { articles, isLoading } = useAllArticles(
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
