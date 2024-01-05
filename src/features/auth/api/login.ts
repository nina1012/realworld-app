import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { BASE_URL_API } from '@/config/constants';
import { queryClient } from '@/lib/react-query';
import { AuthUser, LoginData } from '..';

type UseLoginOptions = {
  onSuccess?: (user: AuthUser) => void;
};

export const loginFn = async (
  data: LoginData
): Promise<AuthUser> => {
  try {
    const response = await apiClient.post(
      `${BASE_URL_API}/users/login`,
      {
        user: {
          ...data,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    //reassign newly logged in user to be stored in localStorage
    const currentUser = await response;

    window.localStorage.setItem(
      'user',
      JSON.stringify(currentUser)
    );
    return currentUser.data;
  } catch (error) {
    throw new Error(`Login failed, ${error}`);
  }
};

export const useLogin = ({
  onSuccess,
}: UseLoginOptions = {}) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: loginFn,
    mutationKey: ['auth-user'],
    onSuccess: (data: AuthUser) => {
      queryClient.setQueryData(['auth-user'], data);
      onSuccess?.(data);
    },
  });
  return { submit, isPending };
};
