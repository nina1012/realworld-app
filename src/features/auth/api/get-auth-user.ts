import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { BASE_URL_API } from '@/config/constants';
import storage from '@/utils/storage';
import { AuthUser } from '..';

export const getAuthUser =
  async (): Promise<AuthUser> => {
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
      return response.data;
    } catch (error: Error | unknown) {
      throw error;
    }
  };

export const useUser = (): {
  data: AuthUser | null;
  isPending: boolean;
} => {
  const { data, isFetching, isFetched } = useQuery({
    queryFn: getAuthUser,
    queryKey: ['auth-user'],
  });
  return {
    data: data || null, // the data should always be either of type AuthUser or null, undefined is not allowed
    isPending: isFetching && !isFetched,
  };
};
