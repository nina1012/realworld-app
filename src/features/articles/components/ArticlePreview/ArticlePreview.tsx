import { BASE_URL } from '@/config/constants';
import { Link } from '@/components/link/link';
import { AiFillHeart } from 'react-icons/ai';
import { ArticleType } from '../../types';
import ArticleMeta from '../ArticleMeta/ArticleMeta';
import { Button } from '@/components/button';

export default function ArticlePreview({
  article,
}: {
  article: ArticleType['article'];
}) {
  const {
    favoritesCount,
    slug,
    title,
    description,
    tagList,
  } = article;

  if (!article) return null;

  return (
    <article className="py-4 border-t-[1px] border-t-neutral-200">
      <div className="flex items-center mb-4">
        <ArticleMeta article={article} />
        <div className="flex ml-auto">
          <Button
            className="flex items-center bg-transparent text-primary border-primary border-[1px] text-sm rounded-sm transition-colors hover:bg-primary hover:text-white h-8 w-auto min-w-min "
            icon={<AiFillHeart />}
          >
            <span>{favoritesCount}</span>
          </Button>
        </div>
      </div>
      <Link href={`${BASE_URL}/articles/${slug}`}>
        <div className="text-zinc-400">
          <h1 className="text-[#373a3c] font-semibold text-2xl mb-1">
            {title}
          </h1>
          <p className="text-base font-light leading-normal mb-4">
            {description}
          </p>
          <div className="flex justify-between flex-wrap lg:flex-nowrap">
            <span className="!text-sm !font-extralight">
              Read more...
            </span>
          </div>
        </div>
      </Link>
      <ul className="tag-list font-light text-sm text-[#ddd] flex flex-wrap justify-end gap-y-1">
        {tagList?.map((tag: string) => (
          <li
            className="border-[1px] border-zinc-300 transition-colors px-2 mx-1 rounded-full hover:border-primary hover:text-primary"
            key={tag}
          >
            <Link href={`/?tag=${tag}`} key={tag}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
