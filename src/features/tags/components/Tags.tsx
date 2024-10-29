import Spinner from '@/components/common/Spinner';
import { Link } from '@/components/link/Link';
import { useTags } from '@/features/tags';
import { demoTags } from '../demoData';
import { GoInfo } from 'react-icons/go';

type TagsProps = {
  articleTags?: string[];
};

const Tags = ({ articleTags }: TagsProps) => {
  const { data, isLoading } = useTags();
  const tags = articleTags || data?.tags;

  if (articleTags) {
    return (
      <ul className="mb-4">
        {tags?.map((tag: string) => (
          <Link
            href={`/?tag=${tag}`}
            key={tag}
            className="text-sm py-[2px] px-3 rounded-3xl bg-white border-zinc-300 border-[1px] text-zinc-300 mr-1 mb-1 transition-colors hover:bg-gray-500 hover:text-white"
          >
            {tag}
          </Link>
        ))}
      </ul>
    );
  }

  return (
    <div className="tags-container relative w-full md:flex-[0_0_25%] min-h-[160px] bg-zinc-100 px-3 py-3 rounded-md ml-auto">
      <p className="mb-4 text-md">Popular tags</p>
      {tags === demoTags && (
        <div className="banner my-2 gap-2 flex items-center justify-center bg-red-100 text-red-800 p-4 rounded-md shadow-md mb-4">
          <GoInfo size={40} />
          <p className="text-xs font-medium">
            You&apos;re viewing sample tags as the service
            is temporarily unavailable.
          </p>
        </div>
      )}
      <div className="flex flex-wrap h-full w-full">
        {isLoading && (
          <Spinner
            color="primary"
            w="32"
            h="32"
            alignment="center"
          />
        )}
        {!data && !isLoading && (
          <h1 className="font-bold text-red-400">
            Error, please refresh the page 😕
          </h1>
        )}
        {tags?.map((tag: string) => (
          <Link
            href={`/?tag=${tag}`}
            key={tag}
            className="text-sm py-[2px] px-3 rounded-3xl bg-slate-500 text-white mr-1 mb-1 transition-colors hover:bg-gray-500"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tags;
