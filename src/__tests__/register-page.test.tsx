import RegisterPage from '@/pages/auth/register';
import {
  appRender,
  waitFor,
  waitForLoadingToFinish,
  screen,
} from '@/testing/test-utils';

const router = {
  replace: jest.fn(),
  query: {},
};

jest.mock('next/router', () => ({
  useRouter: () => router,
}));

describe('Register Page', () => {
  it('should register new user with given credentials and redirect to home', async () => {
    await appRender(<RegisterPage />);

    const credentials = {
      email: 'new@profile.com',
      password: 'password',
      username: 'new_profile',
    };

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const username = screen.getByLabelText(/username/i);
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    });
  });

  waitFor(() => {
    router.replace('/');
    expect(router.replace).toHaveBeenCalledWith('/');
  });
});
