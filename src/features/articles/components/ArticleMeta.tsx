import { ArticleType } from '../types';
import clsx from 'clsx';
import { BASE_URL_API } from '@/config/constants';
import Image from 'next/image';
import { CustomLink } from '@/components/common/CustomLink';

export default function ArticleMeta({
  article,
}: {
  article: ArticleType['article'];
}) {
  if (!article) return null;

  const {
    author: { username, image },
    createdAt,
  } = article;

  return (
    <div className={clsx('mr-auto flex', 'article-meta')}>
      <CustomLink
        href="/profile/[pid]"
        as={`/profile/${encodeURIComponent(username)}`}
        className="flex self-center text-base text-primary mr-2"
      >
        <Image
          width={32}
          height={32}
          src={image}
          alt={`${username}'s avatar`}
          className="overflow-hidden rounded-full"
        />
      </CustomLink>
      <div className="flex flex-col">
        <CustomLink
          href={`${BASE_URL_API}/profiles/${encodeURIComponent(
            username
          )}`}
          className="text-base text-primary font-medium hover:underline"
        >
          {username}
        </CustomLink>
        <span className="text-xs text-[#bbb] block">
          {new Date(createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
}
