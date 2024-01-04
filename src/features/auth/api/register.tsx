import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { BASE_URL_API } from '@/config/constants';
import { queryClient } from '@/lib/react-query';
import { RegisterData } from '../types';

type UseRegisterOptions = {
  onSuccess?: (user: RegisterData) => void;
};

export const registerFn = async (
  data: RegisterData
): Promise<RegisterData> => {
  const response: RegisterData = await apiClient.post(
    `${BASE_URL_API}/users`,
    {
      user: { ...data },
    }
  );
  const currentUser = await response;
  // once the user registered, user's profile will be stored in localStorage
  currentUser &&
    window.localStorage.setItem(
      'user',
      JSON.stringify(currentUser)
    );
  return currentUser;
};

export const useRegister = ({
  onSuccess,
}: UseRegisterOptions = {}) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: registerFn,
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
