import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

type Tags = {
  tags: string[] | null;
};

export const getTags = () => {
  return apiClient.get<Tags, { tags: [] }>(
    `${BASE_URL_API}/tags`
  );
};

export const useTags = () => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });
  return { data, isLoading: isFetching && !isFetched };
};
