import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ProfileType } from '../types';

export const getProfile = async (
  username: string
): Promise<ProfileType | null> => {
  if (!username) {
    return Promise.resolve(null);
  }
  return apiClient.get(
    `${BASE_URL_API}/profiles/${username}`
  );
};

export const useProfile = (username: string) => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => getProfile(username),
  });
  return { profile, isLoading };
};
