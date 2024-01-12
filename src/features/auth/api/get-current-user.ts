import { useQuery } from '@tanstack/react-query';
import storage from '@/utils/storage';
import { AuthUser } from '..';

export const getCurrentUser = (): AuthUser | null => {
  return storage.getUser() || null;
};

export const useUser = (): {
  data: AuthUser | null;
  isPending: boolean;
} => {
  const { data, isFetching, isFetched } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['auth-user'],
  });
  return {
    data: data || null, // the data should always be either of type AuthUser or null, undefined is not allowed
    isPending: isFetching && !isFetched,
  };
};
