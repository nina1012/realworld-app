import { useRouter } from 'next/router';
import { CommentType, useComments } from '../..';
import CommentForm from '../CommentForm/CommentForm';
import Comment from '../Comment/Comment';

export default function CommentList() {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { comments } = useComments(slug as string);

  const onSuccess = () => {
    router.replace(`/articles/${slug}`);
  };
  return (
    <div className="container">
      <div className="flex mx-auto flex-col">
        <CommentForm onSuccess={onSuccess} />
        <div className="flex flex-col gap-y-3">
          {comments?.comments.map(
            (comment: CommentType) => (
              <Comment
                key={comment.id}
                comment={comment}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
