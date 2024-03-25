import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ArticleType } from '../types';

// Get an article. Auth not required
export const getArticle = (
  slug: string
): Promise<ArticleType | null> => {
  if (!slug) {
    return Promise.resolve(null);
  }
  return apiClient.get(
    `${BASE_URL_API}/articles/${slug}`
  );
};

export const useArticle = (slug: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticle(slug),
  });

  return { data, isLoading };
};
