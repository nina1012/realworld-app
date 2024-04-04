import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { CommentType } from '..';
import { queryClient } from '@/lib/react-query';
import {
  InvalidateQueryFilters,
  useMutation,
} from '@tanstack/react-query';

type UseCreateCommentOptions = {
  onSuccess?: (comment: CommentType) => void;
  slug: string;
  comment: CommentType;
  token: string;
};

export const createComment = async (
  slug: string,
  comment: CommentType,
  token: string
): Promise<CommentType> => {
  try {
    const response = await apiClient.post(
      `${BASE_URL_API}/articles/${slug}/comments`,
      JSON.stringify({ comment }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating comment', error);
    throw new Error('Failed creating comment');
  }
};

export const useCreateComment = ({
  onSuccess,
  slug,
  comment,
  token,
}: UseCreateCommentOptions) => {
  const mutationFn = (comment: CommentType) =>
    createComment(slug, comment, token);

  const options = {
    mutationFn,
    mutationKey: ['comments'],
    onSuccess: (data: CommentType) => {
      queryClient.invalidateQueries([
        'comments',
      ] as InvalidateQueryFilters);
      return onSuccess?.(data);
    },
  };
  const { mutate: submit, isPending } =
    useMutation(options);
  return { submit, isPending };
};
