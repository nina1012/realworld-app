import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ProfileType } from '../types';
import storage from '@/utils/storage';

export const getProfile = async (
  username: string
): Promise<ProfileType | null> => {
  if (!username) {
    return Promise.resolve(null);
  }
  const user = storage.getUser()?.user;

  return apiClient.get(
    `${BASE_URL_API}/profiles/${username}`,
    {
      headers: {
        Authorization: `Token ${user && user.token}`,
      },
    }
  );
};

export const useProfile = (username: string) => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => getProfile(username),
  });
  return { profile, isLoading };
};
