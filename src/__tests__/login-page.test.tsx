import LoginPage from '@/pages/auth/login';
import {
  appRender,
  screen,
  userEvent,
  waitFor,
  waitForLoadingToFinish,
} from '@/testing/test-utils';

const router = {
  replace: jest.fn(),
  query: {},
};

jest.mock('next/router', () => ({
  useRouter: () => router,
}));

describe('Login Page', () => {
  it('should login the user into the profile, and when logged in, it should redirect to home', async () => {
    await appRender(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);

    const passwordInput =
      screen.getByLabelText(/password/i);

    const submitButton = screen.getByRole('button', {
      name: /sign in/i,
    });

    const credentials = {
      email: 'new@profile.com',
      password: 'password',
    };

    userEvent.type(emailInput, credentials.email);
    userEvent.type(passwordInput, credentials.password);
    userEvent.click(submitButton);

    await waitForLoadingToFinish();

    await waitFor(() => {
      router.replace('/');
      expect(router.replace).toHaveBeenCalledWith('/');
    });
  });
});
