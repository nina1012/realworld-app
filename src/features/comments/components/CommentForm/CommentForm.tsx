import { Button } from '@/components/button';
import { CustomLink } from '@/components/common/CustomLink';
import { InputField } from '@/components/form/input-field';
import checkLogin from '@/utils/checkLogin';
import storage from '@/utils/storage';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CommentType } from '../..';
import { useForm } from 'react-hook-form';
import { useNotifications } from '@/stores/notifications';
import { useCreateComment } from '../../api/create-comment';
import clsx from 'clsx';

export type CommentFormProps = {
  onSuccess: () => void;
};

export default function CommentForm({
  onSuccess,
}: CommentFormProps) {
  const user = storage.getUser();
  const isLoggedIn = checkLogin(user);

  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const { showNotification } = useNotifications();

  // form and submitting form handling
  // get function that will call the api
  const {
    register,
    handleSubmit,
    formState,
    reset,
    watch,
  } = useForm<CommentType>();

  const token = user?.user.token;

  const { submit: NewComment, isPending } =
    useCreateComment({
      onSuccess: () => {
        onSuccess();
        reset();
      },
      slug: slug as string,
      comment: watch(), // get the form data directly from the input
      token: token as string,
    });

  const onSubmit = async (data: CommentType) => {
    try {
      NewComment(data);
      showNotification({
        type: 'success',
        title: 'Comment successfully created',
        duration: 1000,
        message: 'Successfully created comment',
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to create a comment',
      });
    }
  };

  // check if user can write the comment
  if (!isLoggedIn) {
    return (
      <div className="my-8 text-center">
        <CustomLink
          className="text-primary hover:underline"
          href="/auth/login"
          as="/auth/login"
        >
          Sign in
        </CustomLink>
        &nbsp;or&nbsp;
        <CustomLink
          className="text-primary hover:underline"
          href="/auth/register"
          as="/auth/register"
        >
          sign up
        </CustomLink>
        &nbsp;to leave comment on this article
      </div>
    );
  }

  return (
    <form
      className="form rounded-md mb-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        type="textarea"
        id="body"
        autoComplete="true"
        label="Write a comment"
        className="!mb-0 !h-[100px]"
        error={(formState.errors as any)['comment.body']}
        {...register('body', { required: true })}
      />
      <div className="flex items-center justify-between  -mt-[22px] font-light py-3 px-6 bg-neutral-100">
        <Image
          width={30}
          height={30}
          className="comment-author-img rounded-full"
          src={user?.user?.image as string}
          alt="Comment author's profile image"
        />
        <Button
          className={clsx(
            isPending && 'opacity-80',
            'h-8'
          )}
          variant="solid"
          type="submit"
          isdisabled={isPending}
        >
          {isPending
            ? 'Posting comment...'
            : 'Post comment'}
        </Button>
      </div>
    </form>
  );
}
