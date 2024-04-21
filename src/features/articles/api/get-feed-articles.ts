import { ArticlesType } from '../types';
import { apiClient } from '@/lib/api-client';
import { BASE_URL_API, LIMIT } from '@/config/constants';
import { useQuery } from '@tanstack/react-query';
import storage from '@/utils/storage';

// Get most recent articles from users you follow. Use query parameters to limit. Auth is required
export const getFeedArticles = async (
  page: number,
  limit?: number
): Promise<ArticlesType | null> => {
  const user = storage.getUser()?.user;
  if (!user) return Promise.resolve(null);
  return apiClient.get(
    `${BASE_URL_API}/articles/feed?offset${page}&limit=${
      limit || LIMIT
    }`,
    {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    }
  );
};

export const useFeedArticles = (page: number) => {
  const { data: feed, isLoading: isLoadingFeed } =
    useQuery({
      queryKey: ['feed', page],
      queryFn: () => getFeedArticles(page),
    });
  return { feed, isLoadingFeed };
};
