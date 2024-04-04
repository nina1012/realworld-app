import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import storage from '@/utils/storage';
import {
  InvalidateQueryFilters,
  useMutation,
} from '@tanstack/react-query';

type UseDeleteCommentOptions = {
  slug: string;
  commentId: string;
};

export const deleteComment = async (
  slug: string,
  commentId: string
) => {
  try {
    const token = storage.getUser()?.user.token;
    const response = await apiClient.delete(
      `${BASE_URL_API}/articles/${slug}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error deleting comment', error);
    throw new Error('Failed deleting comment');
  }
};

export const useDeleteComment = ({
  slug,
  commentId,
}: UseDeleteCommentOptions) => {
  const mutationFn = () => deleteComment(slug, commentId);

  const { mutate: submit, isPending } = useMutation({
    mutationFn,
    mutationKey: ['comments'],
    onSuccess: () => {
      queryClient.invalidateQueries([
        'comments',
      ] as InvalidateQueryFilters);
    },
  });
  return { submit, isPending };
};
