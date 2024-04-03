import { useRouter } from 'next/router';
import { CommentType, useComments } from '..';
import CommentForm from './CommentForm';
import Comment from './Comment';

export default function CommentList() {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { comments } = useComments(slug as string);
  return (
    <div className="container">
      <div className="flex mx-auto flex-col w-10/12">
        <CommentForm />
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
