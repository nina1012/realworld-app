import Spinner from '@/components/common/Spinner';
import { Link } from '@/components/link/link';
import { useTags } from '@/features/tags';

const Tags = () => {
  const { data, isLoading } = useTags();

  return (
    <div className="relative flex-[0_0_25%] w-1/4 min-h-[160px] bg-zinc-100 px-3 py-3 rounded-md ml-auto">
      <p className="mb-4 text-md">Popular tags</p>

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
          <h1 className=" font-bold text-red-400">
            Error, please refresh the page 😕
          </h1>
        )}
        {data?.tags.map((tag: string) => (
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
