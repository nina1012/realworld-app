import { AuthUser } from '@/features/auth';

const storage = {
  getUser: (): AuthUser | null => {
    try {
      const userData =
        window.localStorage.getItem('user');

      // Check if userData is null or empty before parsing
      if (!userData) {
        return null;
      }

      const parsedUser = JSON.parse(userData) as AuthUser;
      return parsedUser || null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
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
