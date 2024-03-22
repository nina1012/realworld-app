import { AuthUser } from '@/features/auth';

const checkLogin = (currentUser: AuthUser | null) =>
  !!currentUser &&
  currentUser?.constructor === Object &&
  Object.keys(currentUser).length !== 0;

export default checkLogin;
