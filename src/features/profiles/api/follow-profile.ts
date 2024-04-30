import { BASE_URL_API } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import storage from '@/utils/storage';
import { useMutation } from '@tanstack/react-query';
import { ProfileType } from '../types';
import { queryClient } from '@/lib/react-query';

export const followProfile = (
  username: string
): Promise<ProfileType | null> => {
  const token = storage.getUser()?.user.token;
  if (!token) return Promise.resolve(null);
  return apiClient.post(
    `${BASE_URL_API}/profiles/${username}/follow`,
    {},
    { headers: { Authorization: `Token ${token}` } }
  );
};

export const unfollowProfile = (
  username: string
): Promise<ProfileType | null> => {
  const token = storage.getUser()?.user.token;
  if (!token) return Promise.resolve(null);
  return apiClient.delete(
    `${BASE_URL_API}/profiles/${username}/follow`,
    { headers: { Authorization: `Token ${token}` } }
  );
};

export const useFollow = (username: string) => {
  const mutationFnFollow = () => followProfile(username);
  const { mutate: follow } = useMutation({
    mutationFn: mutationFnFollow,
    mutationKey: ['profile', username],
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['profile', username],
      });

      const prevFollowProfile =
        await queryClient.getQueryData([
          'profile',
          username,
        ]);

      queryClient.setQueryData(
        ['profile', username],
        (prevData: ProfileType['profile']) => {
          if (prevData) {
            return { ...prevData, following: true };
          }
          return prevData;
        }
      );
      return { prevFollowProfile };
    },

    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newArticle, context) => {
      queryClient.setQueryData(
        ['profile', username],
        context?.prevFollowProfile
      );
    },
    // refetch after error or success:
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['profile', username],
      });
    },
  });

  const mutationFnUnfollow = () =>
    unfollowProfile(username);
  const { mutate: unfollow } = useMutation({
    mutationFn: mutationFnUnfollow,
    mutationKey: ['profile', username],
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['profile', username],
      });

      const prevUnfollowProfile =
        await queryClient.getQueryData([
          'profile',
          username,
        ]);

      queryClient.setQueryData(
        ['profile', username],
        (prevData: ProfileType['profile']) => {
          if (prevData) {
            return { ...prevData, following: false };
          }
          return prevData;
        }
      );
      return { prevUnfollowProfile };
    },

    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newArticle, context) => {
      queryClient.setQueryData(
        ['profile', username],
        context?.prevUnfollowProfile
      );
    },
    // refetch after error or success:
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['profile', username],
      });
    },
  });

  return { follow, unfollow };
};
