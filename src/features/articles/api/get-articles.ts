import { BASE_URL_API, LIMIT } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ArticlesType } from '../types';

// Get most recent articles globally. Use query parameters to filter results. Auth is optional
export const getArticles = (
  tag?: string,
  author?: string,
  page?: number
): Promise<ArticlesType | null> => {
  // get articles by author
  if (author) {
    return apiClient.get(
      `${BASE_URL_API}/articles?author=${encodeURIComponent(
        author
      )}&offset=${page}&limit=${LIMIT}`
    );
  }

  // get articles by tags
  if (tag) {
    return apiClient.get(
      `${BASE_URL_API}/articles?tag=${tag}&offset=${page}&limit=${LIMIT}`
    );
  }

  // global articles

  return apiClient.get(
    `${BASE_URL_API}/articles?&offset=${page}&limit=${LIMIT}`
  );
};

export const useArticles = (
  tag?: string,
  author?: string,
  page?: number
) => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles', tag, author, page],
    queryFn: () => getArticles(tag, author, page),
  });

  return { articles: articles || null, isLoading };
};
