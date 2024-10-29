import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { demoTags } from '../demoData';

type Tags = {
  tags: string[] | null;
};

export const getTags = async () => {
  try {
    const response = await apiClient.get<
      Tags,
      { tags: string[] }
    >(`${BASE_URL_API}/tags`);
    return response;
  } catch (error) {
    console.warn(
      'API is down. Using demo tags as fallback.'
    );
    return { tags: demoTags };
  }
};

export const useTags = () => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });
  return { data, isLoading: isFetching && !isFetched };
};
