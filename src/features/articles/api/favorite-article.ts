import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import storage from '@/utils/storage';
import {
  QueryFilters,
  RefetchQueryFilters,
  useMutation,
} from '@tanstack/react-query';
import { ArticleType } from '../types';

export const favoriteArticle = (
  slug: string
): Promise<null> => {
  const token = storage.getUser()?.user.token;
  if (!token) return Promise.resolve(null);
  return apiClient.post(
    `${BASE_URL_API}/articles/${slug}/favorite`,
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

export const unfavoriteArticle = (
  slug: string
): Promise<ArticleType | null> => {
  const token = storage.getUser()?.user.token;
  if (!token) return Promise.resolve(null);
  return apiClient.delete(
    `${BASE_URL_API}/articles/${slug}/favorite`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

// both favorite and unfavorite funcionalities are in useFavoriteArticle
export const useFavoriteArticle = (slug: string) => {
  // handle favorite
  const mutationFnFavorite = () => favoriteArticle(slug);
  const { mutate: favorite } = useMutation({
    mutationFn: mutationFnFavorite,
    mutationKey: ['articles'],
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['articles'],
      });

      const prevFavArticles =
        await queryClient.getQueryData(['articles']);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['articles'],
        (prevData: ArticleType['article']) => {
          if (prevData) {
            return {
              ...prevData,
              favorited: true,
            };
          }
          return prevData;
        }
      );

      // Return a context object with the snapshotted value

      return { prevFavArticles };
    },

    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newArticle, context) => {
      queryClient.setQueryData(
        ['articles'],
        context?.prevFavArticles
      );
    },
    // refetch after error or success:
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
  });

  // handle unfavorite

  const mutationFnUnfavorite = () =>
    unfavoriteArticle(slug);
  const { mutate: unfavorite } = useMutation({
    mutationFn: mutationFnUnfavorite,
    mutationKey: ['articles'],

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['articles'],
      });

      const prevUnfavArticles =
        await queryClient.getQueryData(['articles']);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['articles'],
        (prevData: ArticleType) => {
          if (prevData) {
            return {
              ...prevData,
              favorited: false,
            };
          }
          return prevData;
        }
      );

      // Return a context object with the snapshotted value
      return { prevUnfavArticles };
    },

    onError: (err, newArticle, context) => {
      queryClient.setQueryData(
        ['articles'],
        context?.prevUnfavArticles
      );
    },
    // refetch after error or success:
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
  });

  return {
    favorite,
    unfavorite,
  };
};
