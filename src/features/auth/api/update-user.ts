import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { BASE_URL_API } from '@/config/constants';
import { queryClient } from '@/lib/react-query';
import { AuthUser, UpdateUser } from '../types';
import { getCurrentUser } from './get-current-user';

type UseUpdateOptions = {
  onSuccess?: (user: AuthUser) => void;
};

export const updateFn = async (
  data: UpdateUser
): Promise<AuthUser> => {
  try {
    // getting current logged user in order to get its token
    const currentUser = getCurrentUser();
    const response: AuthUser = await apiClient.put(
      `${BASE_URL_API}/user`,
      JSON.stringify({ ...data }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${currentUser?.user?.token}`,
        },
      }
    );
    const updatedUser = await response;
    // update user's info inside the local storage
    updatedUser &&
      window.localStorage.setItem(
        'user',
        JSON.stringify(updatedUser)
      );
    return updatedUser;
  } catch (error) {
    throw new Error(`Login failed, ${error}`);
  }
};

export const useUpdate = ({
  onSuccess,
}: UseUpdateOptions = {}) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: updateFn,
    mutationKey: ['auth-user'],
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], {
        ...data,
      });
      return onSuccess?.(data);
    },
  });
  return { submit, isPending };
};
