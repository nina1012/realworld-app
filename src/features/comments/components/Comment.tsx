import { CustomLink } from '@/components/common/CustomLink';
import Image from 'next/image';
import { CommentType } from '..';

export default function Comment({
  comment,
}: {
  comment: CommentType;
}) {
  console.log(comment);
  return (
    <div className="comment-card flex-col flex-nowrap mx-auto sm:w-[540px] border-[1px] border-gray-200 rounded">
      <div className="comment-body p-5 bg-white">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="comment-info text-xs bg-neutral-100 p-5 flex items-center">
        <CustomLink
          href={`profile/${comment.author.username}`}
          as={`/profile/${comment.author.username}`}
          className=""
        >
          <Image
            width={30}
            height={30}
            src={comment.author.image}
            alt="Comment author's profile image"
            className="rounded-full"
          />
        </CustomLink>
        &nbsp;
        <CustomLink
          href={`profile/${comment.author.username}`}
          as={`/profile/${comment.author.username}`}
          className="text-primary hover:underline ml-1"
        >
          {comment.author.username}
        </CustomLink>
        <span className="ml-2 text-stone-300">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
}
