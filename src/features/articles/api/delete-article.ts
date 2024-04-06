import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import storage from '@/utils/storage';
import {
  InvalidateQueryFilters,
  useMutation,
} from '@tanstack/react-query';

type UseDeleteArticleOptions = {
  slug: string;
};

export const deleteArticle = async (slug: string) => {
  try {
    const token = storage.getUser()?.user.token;
    return await apiClient.delete(
      `${BASE_URL_API}/articles/${slug}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  } catch (error) {
    console.error('Error deleting article', error);
    throw new Error('Failed to delete article');
  }
};

export const useDeleteArticle = ({
  slug,
}: UseDeleteArticleOptions) => {
  const mutationFn = () => deleteArticle(slug);

  const { mutate: submit, isPending } = useMutation({
    mutationFn,
    mutationKey: ['articles', slug],
    onSuccess: () => {
      queryClient.invalidateQueries([
        'articles',
      ] as InvalidateQueryFilters);
    },
  });
  return { submit, isPending };
};
