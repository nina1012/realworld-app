import { BASE_URL_API, LIMIT } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { Article } from '../types';

// Get most recent articles globally. Use query parameters to filter results. Auth is optional
export const getAllArticles = (tag: string) => {
  return apiClient.get(`${BASE_URL_API}/articles${
    tag ? '?tag=' + tag + '&' : ''
  }?limit=10&offset=0
`);
};

export const useAllArticles = (tag: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['all-articles', tag],
    queryFn: () => getAllArticles(tag),
  });

  return { data, isLoading };
};
