import { Button } from '@/components/button/button';
import SectionContainer from '@/components/common/SectionContainer';
import { InputField } from '@/components/form/input-field';

import { useRegister } from '../../api/register';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { AuthUser, RegisterData } from '../..';
import { getCurrentUser } from '../../api/get-current-user';
import { useNotifications } from '@/stores/notifications';

export type RegisterFormProps = {
  onSuccess: () => RegisterData | AuthUser | null;
};

export const RegisterForm = ({
  onSuccess,
}: RegisterFormProps) => {
  // renaming because of collision with useForm hook from react-form-hook
  const registerFn = useRegister({ onSuccess });

  const { handleSubmit, register, formState } =
    useForm<RegisterData>();

  const { showNotification } = useNotifications();

  const onSubmit = (data: RegisterData) => {
    registerFn.submit(data);
    getCurrentUser();
    showNotification({
      type: 'success',
      title: 'Registering',
      duration: 1000,
      message: 'Successfully registered',
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
            className="form"
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
