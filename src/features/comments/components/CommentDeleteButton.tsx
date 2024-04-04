import { useRouter } from 'next/router';
import { useDeleteComment } from '../api/delete-comment';
import { HiOutlineTrash } from 'react-icons/hi2';
import clsx from 'clsx';

export default function CommentDeleteButton({
  commentId,
}: {
  commentId: string;
}) {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { submit: DeleteComment, isPending } =
    useDeleteComment({ slug: slug as string, commentId });

  return (
    <span
      className={clsx(
        'text-base ml-auto hover:cursor-pointer text-gray-400 hover:text-red-400 transition-colors h-full',
        isPending ? 'opacity-50' : 'opacity-100'
      )}
      onClick={() => DeleteComment()}
    >
      <HiOutlineTrash />
    </span>
  );
}
