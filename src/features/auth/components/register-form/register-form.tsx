import { Button } from '@/components/button/button';
import SectionContainer from '@/components/common/SectionContainer';
import { InputField } from '@/components/form/input-field';

import { useRegister } from '../../api/register';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { RegisterData } from '../..';
import { getAuthUser } from '../../api/get-auth-user';

export type RegisterFormProps = {
  onSuccess: () => RegisterData | {};
};

export const RegisterForm = ({
  onSuccess,
}: RegisterFormProps) => {
  // renaming because of collision with useForm hook from react-form-hook
  const registerFn = useRegister({ onSuccess });

  const { handleSubmit, register, formState } =
    useForm<RegisterData>();

  const onSubmit = (data: RegisterData) => {
    registerFn.submit(data);
    getAuthUser();
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
              Sign up
            </h1>
            <Link
              href="/auth/login"
              className="text-primary hover:underline"
            >
              Have an account?
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="!flex flex-col flex-nowrap mx-auto sm:w-[540px]"
          >
            <InputField
              type="text"
              label="Username"
              error={formState.errors['username']}
              {...register('username', {
                required: true,
              })}
            />
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
              variant="solid"
              className="self-end"
              type="submit"
            >
              Sign up
            </Button>
          </form>
        </div>
      </SectionContainer>
    </div>
  );
};
