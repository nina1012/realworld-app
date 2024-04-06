import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { ArticleType } from '..';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

type UseUpdateArticleOptions = {
  onSuccess?: (data: ArticleType) => ArticleType;
  updatedArticle: ArticleType;
  slug: string;
  token: string;
};

export const updateArticle = async (
  slug: string,
  updatedArticle: ArticleType,
  token: string
): Promise<ArticleType> => {
  try {
    const response = await apiClient.put(
      `${BASE_URL_API}/articles/${slug}`,
      JSON.stringify(updatedArticle),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating article', error);
    throw new Error('Failed to update article');
  }
};

export const useUpdateArticle = ({
  onSuccess,
  updatedArticle,
  slug,
  token,
}: UseUpdateArticleOptions) => {
  const mutationFn = async (data: ArticleType) => {
    return await updateArticle(
      slug,
      updatedArticle,
      token
    );
  };
  const options = {
    mutationFn,
    mutationKey: ['articles'],
    onSuccess: (data: ArticleType) => {
      queryClient.setQueryData(['articles'], data);
      onSuccess?.(data);
    },
  };

  const { mutate: submit, isPending } =
    useMutation(options);
  return { submit, isPending };
};
