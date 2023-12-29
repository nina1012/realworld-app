import { BASE_URL } from '@/config/constants';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';
import { Article } from '../types';

const ArticlePreview = (props: Article) => {
  const {
    // author: { username, image },
    createdAt,
    favoritesCount,
    slug,
    title,
    description,
    tagList,
  } = props;

  if (!props) return;

  return (
    <article className="py-4 border-t-[1px] border-t-neutral-200">
      <div className="flex items-center mb-4">
        {/* <ArticleInfo article={article} /> */}
        <div className="">
          <button className="flex items-center bg-transparent text-primary border-primary border-[1px] p-1 text-sm rounded-sm transition-colors hover:bg-primary hover:text-white">
            <AiFillHeart />
            <span>{favoritesCount}</span>
          </button>
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
          <div className="flex justify-between">
            <span className="!text-sm !font-extralight">
              Read more...
            </span>
            <ul className="tag-list font-light text-sm text-[#ddd] flex max-w-[50%]">
              {tagList?.map((tag: string) => (
                <li
                  className=" border-[1px] border-zinc-300 px-2 mx-1 rounded-full "
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticlePreview;
