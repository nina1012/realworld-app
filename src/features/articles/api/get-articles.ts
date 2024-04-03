import { BASE_URL_API, LIMIT } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ArticlesType } from '../types';

// Get most recent articles globally. Use query parameters to filter results. Auth is optional
export const getArticles = (
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

export const useArticles = (
  tag?: string,
  author?: string
) => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles', tag, author],
    queryFn: () => getArticles(tag, author),
  });

  return { articles: articles || null, isLoading };
};
