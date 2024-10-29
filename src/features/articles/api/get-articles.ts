import { BASE_URL_API, LIMIT } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ArticlesType } from '../types';
import storage from '@/utils/storage';
import { demoArticles } from '../demoData';

// Get most recent articles globally. Use query parameters to filter results. Auth is optional
export const getArticles = async (
  tag?: string,
  author?: string,
  page?: number
): Promise<ArticlesType | null> => {
  // check if the user is logged in or not
  // get articles by author
  const user = storage.getUser()?.user;

  try {
    let response;
    if (author) {
      response = await apiClient.get(
        `${BASE_URL_API}/articles?author=${encodeURIComponent(
          author
        )}&offset=${page}&limit=${LIMIT}`,
        user && {
          headers: {
            Authorization: `Token ${user && user.token}`,
          },
        }
      );
    } else if (tag) {
      response = await apiClient.get(
        `${BASE_URL_API}/articles?tag=${tag}&offset=${page}&limit=${LIMIT}`,
        user && {
          headers: {
            Authorization: `Token ${user && user.token}`,
          },
        }
      );
    } else {
      response = await apiClient.get(
        `${BASE_URL_API}/articles?&offset=${page}&limit=${LIMIT}`,
        user && {
          headers: {
            Authorization: `Token ${user?.token}`,
          },
        }
      );
    }

    return response.data;
  } catch (error) {
    console.error(
      'API is down, serving demo articles:',
      error
    );
    return demoArticles as ArticlesType; // Fallback to demo articles
  }
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
