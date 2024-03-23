import { BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { Article } from '../types';

export const getArticle = async (
  slug: string
): Promise<Article | null> => {
  try {
    const response = await apiClient.get(
      `${BASE_URL}/articles/${slug}`
    );
    return response.data;
  } catch (error) {
    // Handle error or return null/undefined
    console.error('Error fetching article:', error);
    return null;
  }
};

export const useArticle = (slug: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticle(slug),
  });

  return { data, isLoading };
};
