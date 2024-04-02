import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { ProfileType } from '../types/ProfileType';

export const getProfile = async (
  name: string
): Promise<ProfileType | null> => {
  if (!name) {
    return Promise.resolve(null);
  }
  return apiClient.get(
    `${BASE_URL_API}/profiles/${name}`
  );
};

export const useProfile = (name: string) => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', name],
    queryFn: () => getProfile(name),
  });
  return { profile, isLoading };
};
