import { queryClient } from '@/lib/react-query';
import storage from '@/utils/storage';
import {
  InvalidateQueryFilters,
  useMutation,
} from '@tanstack/react-query';

export const logoutFn = async () => {
  storage.clearUser();
};

type UseLogoutOptions = {
  onSuccess?: () => void;
};

export const useLogout = ({
  onSuccess,
}: UseLogoutOptions = {}) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: logoutFn,
    mutationKey: ['logout'], // Use a unique key not related to 'auth-user'
    onSuccess: () => {
      queryClient.invalidateQueries([
        'auth-user',
      ] as InvalidateQueryFilters);
      onSuccess?.();
    },
  });
  return {
    submit,
    isPending,
  };
};
