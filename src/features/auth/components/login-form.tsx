import SectionContainer from '@/components/common/SectionContainer';
import { InputField } from '@/components/form/input-field';
import { Button } from '@/components/button/button';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useLogin } from '../api/login';
import { AuthUser, LoginData } from '..';
import { useNotifications } from '@/stores/notifications/notifications';

export type LoginFormProps = {
  onSuccess: () => LoginData | AuthUser | null;
};

export const LoginForm = ({
  onSuccess,
}: LoginFormProps) => {
  const loginFn = useLogin({ onSuccess });

  const { register, handleSubmit, formState } =
    useForm<LoginData>();

  const { showNotification } = useNotifications();

  const onSubmit = (data: LoginData) => {
    loginFn.submit(data);
    showNotification({
      type: 'success',
      title: 'Logging in',
      duration: 1000,
      message: 'Successfully logged in!',
    });
  };

  return (
    <div className="py-4 h-[calc(100vh-100px)]">
      <SectionContainer styles="text-center">
        <div>
          <div className="mb-4">
            <h1
              style={{ fontSize: '40px' }}
              className="font-medium  mb-2"
            >
              Sign in
            </h1>
            <Link
              href="/auth/register"
              className="text-primary hover:undeline"
            >
              Need an account?
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="!flex flex-col flex-nowrap mx-auto sm:w-[540px]"
          >
            <InputField
              type="email"
              id="email"
              autoComplete="true"
              label="Email"
              error={formState.errors['email']}
              {...register('email', {
                required: true,
              })}
            />
            <InputField
              type="password"
              id="password"
              autoComplete="true"
              label="Password"
              error={formState.errors['password']}
              {...register('password', {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="!ml-auto"
              variant="solid"
            >
              Sign in
            </Button>
          </form>
        </div>
      </SectionContainer>
    </div>
  );
};
