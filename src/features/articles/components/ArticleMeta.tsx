import { ArticleType } from '../types';
import clsx from 'clsx';
import Image from 'next/image';
import { CustomLink } from '@/components/common/CustomLink';
import ArticleActions from './ArticleActions';
import { useRouter } from 'next/router';
import { Conditional } from '@/components/common/Conditional';

export default function ArticleMeta({
  article,
}: {
  article: ArticleType['article'];
}) {
  // only show ArticleActions when on articles page
  const router = useRouter();
  const isArticlesPage =
    router.pathname.includes('articles');

  if (!article) return null;

  const {
    author: { username, image },
    createdAt,
  } = article;

  return (
    <div
      className={clsx(
        'mr-auto flex flex-col items-center lg:flex-row',
        'article-meta'
      )}
    >
      <CustomLink
        href={`/profile/${username}`}
        as={`/profile/${encodeURIComponent(username)}`}
        className="flex self-start text-base text-primary mr-2"
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
          href={`/profile/${encodeURIComponent(
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
      <Conditional condition={isArticlesPage}>
        <ArticleActions article={article} />
      </Conditional>
    </div>
  );
}
