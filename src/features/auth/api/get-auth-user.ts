import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { BASE_URL_API } from '@/config/constants';
import storage from '@/utils/storage';
import { AuthUser } from '..';

export const getAuthUser = async () => {
  const {
    user: { token },
  }: AuthUser = storage.getUser() || null;
  try {
    const response = await apiClient.get(
      `${BASE_URL_API}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: Error | unknown) {
    return error;
  }
};

export const useUser = () => {
  const { data, isFetching, isFetched } = useQuery({
    queryFn: getAuthUser,
    queryKey: ['auth-user'],
  });
  return { data, isPending: isFetching && !isFetched };
};
