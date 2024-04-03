import { Button } from '@/components/button';
import { CustomLink } from '@/components/common/CustomLink';
import { InputField } from '@/components/form/input-field';
import { AuthUser } from '@/features/auth';
import checkLogin from '@/utils/checkLogin';
import storage from '@/utils/storage';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function CommentInput() {
  // check if user can write the comment
  const user = storage.getUser();
  const isLoggedIn = checkLogin(user);

  const router = useRouter();
  const {
    query: { username },
  } = router;

  if (!isLoggedIn) {
    return (
      <div>
        <CustomLink
          className="text-primary hover:underline"
          href="/user/login"
          as="/user/login"
        >
          Sign in
        </CustomLink>
        &nbsp;or&nbsp;
        <CustomLink
          className="text-primary hover:underline"
          href="/user/register"
          as="/user/register"
        >
          sign up
        </CustomLink>
        &nbsp;to add comments on this article.
      </div>
    );
  }

  return (
    <form
      className="form rounded-md mb-3"
      // onSubmit={handleSubmit}
    >
      <InputField
        type="textarea"
        label="Write a comment"
        className="!mb-0 !h-[100px]"
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
          className="h-8"
          variant="solid"
          type="submit"
        >
          Post Comment
        </Button>
      </div>
    </form>
  );
}
