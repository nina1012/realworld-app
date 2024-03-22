import Spinner from '@/components/common/Spinner';
import { useAllArticles } from '../api/get-all-articles';
import { useRouter } from 'next/router';
import ArticlePreview from './ArticlePreview';

const ArticleList = () => {
  const router = useRouter();
  const { query } = router;

  const tag = query.tag as string;

  const { data, isLoading } = useAllArticles(tag);

  return (
    <div className="mb-12 flex h-full flex-col justify-center">
      {isLoading ? (
        <Spinner
          color={''}
          w={''}
          h={''}
          alignment={''}
        />
      ) : (
        <div className="mb-12">
          {data?.articles?.map((article) => (
            <ArticlePreview
              {...article}
              key={article.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
