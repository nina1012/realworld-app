import { BASE_URL_API } from '@/config/constants';
import { CreateArticle } from '@/features/articles';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import {
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query';

type UseCreateOptions = {
  onSuccess?: (article: CreateArticle) => void;
  article: CreateArticle;
  token: string;
};

export const createNewArticle = async (
  article: CreateArticle,
  token: string
): Promise<CreateArticle> => {
  try {
    const response = await apiClient.post(
      `${BASE_URL_API}/articles`,
      JSON.stringify(article),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data as CreateArticle;
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Failed to create article');
  }
};
export const useCreateNewArticle = ({
  onSuccess,
  article,
  token,
}: UseCreateOptions) => {
  // passing mutationFn this way because I had type issues
  const mutationFn = async () => {
    return await createNewArticle(article, token);
  };

  const options: UseMutationOptions<
    CreateArticle,
    Error,
    CreateArticle
  > = {
    mutationFn, // Pass the mutation function
    mutationKey: ['new-article'],
    onSuccess: (data) => {
      queryClient.setQueryData(['new-article'], data);
      onSuccess?.(data);
    },
  };

  const { mutate: submit, isPending } =
    useMutation(options);

  return { submit, isPending };
};
