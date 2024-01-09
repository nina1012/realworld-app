import SectionContainer from '@/components/common/SectionContainer';
import { InputField } from '@/components/form/input-field';
import { Button } from '@/components/button/button';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useLogin } from '../../api/login';
import { AuthUser, LoginData } from '../..';
import { useUser } from '../../api/get-auth-user';

export type LoginFormProps = {
  onSuccess: () => LoginData | AuthUser | null;
};

export const LoginForm = ({
  onSuccess,
}: LoginFormProps) => {
  const loginFn = useLogin({ onSuccess });

  const { register, handleSubmit, formState } =
    useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    loginFn.submit(data);
  };

  const { data: userData } = useUser();

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
              label="Email"
              error={formState.errors['email']}
              {...register('email', {
                required: true,
              })}
            />
            <InputField
              type="password"
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
              Sign up
            </Button>
          </form>
        </div>
      </SectionContainer>
    </div>
  );
};
