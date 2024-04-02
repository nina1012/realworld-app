import { BASE_URL_API, LIMIT } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ArticlesType } from '../types';

// Get most recent articles globally. Use query parameters to filter results. Auth is optional
export const getAllArticles = (
  tag?: string,
  author?: string
): Promise<ArticlesType | null> => {
  if (author) {
    return apiClient.get(
      `${BASE_URL_API}/articles?author=${encodeURIComponent(
        author
      )}`
    );
  }

  return apiClient.get(`${BASE_URL_API}/articles${
    tag ? '?tag=' + tag + '&' : ''
  }?limit=10&offset=0
  }
`);
};

export const useAllArticles = (
  tag?: string,
  author?: string
) => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['all-articles', tag, author],
    queryFn: () => getAllArticles(tag, author),
  });

  return { articles: articles || null, isLoading };
};
