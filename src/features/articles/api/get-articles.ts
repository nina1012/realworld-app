import { BASE_URL_API, LIMIT } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ArticlesType } from '../types';
import storage from '@/utils/storage';

// Get most recent articles globally. Use query parameters to filter results. Auth is optional
export const getArticles = (
  tag?: string,
  author?: string,
  page?: number
): Promise<ArticlesType | null> => {
  // check if the user is logged in or not
  // get articles by author
  const user = storage.getUser()?.user;

  if (author) {
    return apiClient.get(
      `${BASE_URL_API}/articles?author=${encodeURIComponent(
        author
      )}&offset=${page}&limit=${LIMIT}`,
      user && {
        headers: {
          Authorization: `Token ${user && user.token}`,
        },
      }
    );
  }

  // get articles by tags
  if (tag) {
    return apiClient.get(
      `${BASE_URL_API}/articles?tag=${tag}&offset=${page}&limit=${LIMIT}`,
      user && {
        headers: {
          Authorization: `Token ${user && user.token}`,
        },
      }
    );
  }

  // global articles
  return apiClient.get(
    `${BASE_URL_API}/articles?&offset=${page}&limit=${LIMIT}`,
    user && {
      headers: {
        Authorization: `Token ${user?.token}`,
      },
    }
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
