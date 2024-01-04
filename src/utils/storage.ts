import { AuthUser } from '@/features/auth';

const storage = {
  getUser: (): AuthUser => {
    return JSON.parse(
      window.localStorage.getItem('user') || ''
    );
  },
  setUser: (userData: AuthUser) => {
    window.localStorage.setItem(
      'user',
      JSON.stringify(userData)
    );
  },
  clearUser: (): void => {
    window.localStorage.removeItem('user');
  },
};

export default storage;
