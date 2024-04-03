import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { CommentsType } from '..';

// Get the comments for an article. Auth is optional
export const getComments = (
  slug: string
): Promise<CommentsType | null> => {
  return apiClient.get(
    `${BASE_URL_API}/articles/${slug}/comments`
  );
};

export const useComments = (slug: string) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', slug],
    queryFn: () => getComments(slug),
  });

  return { comments: comments || null, isLoading };
};
