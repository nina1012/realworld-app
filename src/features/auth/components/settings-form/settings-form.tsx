import { Button } from '@/components/button';
import SectionContainer from '@/components/common/SectionContainer';
import { InputField } from '@/components/form/input-field';
import { useLogout } from '../../api/logout';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AuthUser, UpdateUser } from '../..';
import { getCurrentUser } from '../../api/get-current-user';
import { useUpdate } from '../../api/update-user';
import { useNotifications } from '@/stores/notifications/notifications';

export type SettingsFormProps = {
  onSuccess: () => AuthUser | null;
};

export const SettingsForm = ({
  onSuccess,
}: SettingsFormProps) => {
  // getting user's data
  const user = getCurrentUser();

  // form submit settings

  const updateFn = useUpdate({ onSuccess });

  const { register, handleSubmit, formState } =
    useForm<UpdateUser>({
      defaultValues: {
        user: {
          image: user?.user.image,
          username: user?.user.username,
          bio: user?.user.bio,
          email: user?.user.email,
          password: undefined,
        },
      },
    });

  const onSubmit = (data: UpdateUser) => {
    updateFn.submit(data);
  };

  // Logout functionality
  const { submit: logout } = useLogout();
  const router = useRouter();
  const { showNotification } = useNotifications();

  const handleLogout = () => {
    router.replace('/');
    showNotification({
      type: 'success',
      title: 'Logging out',
      duration: 1000,
      message: 'Logging out',
    });
    logout();
  };

  return (
    <div className="py-4 min-h-[calc(100vh-100px)] my-8">
      <SectionContainer styles="text-center">
        <div className="sm:w-[540px] mx-auto">
          <div className="mb-4">
            <h1
              style={{ fontSize: '40px' }}
              className="font-medium  mb-2"
            >
              Your Settings
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete={'true'}
            className="!flex flex-col flex-nowrap mx-auto sm:w-[540px]"
          >
            <InputField
              type="text"
              label="URL of profile picture"
              error={
                (formState.errors as any)['user.image']
              }
              {...register('user.image')}
            />
            <InputField
              type="text"
              label="Username"
              error={
                (formState.errors as any)['user.username']
              }
              {...register('user.username')}
            />
            <InputField
              type="textarea"
              label="Short bio about you"
              error={
                (formState.errors as any)['user.bio']
              }
              {...register('user.bio')}
            />
            <InputField
              type="email"
              label="Email"
              error={
                (formState.errors as any)['user.email']
              }
              {...register('user.email')}
            />
            <InputField
              type="password"
              label="New Password"
              error={
                (formState.errors as any)['user.password']
              }
              {...register('user.password')}
            />

            <Button
              type="submit"
              className="!ml-auto "
              variant="solid"
            >
              Update Settings
            </Button>
          </form>
          <hr className="my-4" />
          <Button
            type="button"
            className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
            variant="outline"
            onClick={() => handleLogout()}
          >
            Or click here to log out
          </Button>
        </div>
      </SectionContainer>
    </div>
  );
};
