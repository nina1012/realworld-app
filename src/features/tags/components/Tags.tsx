import Spinner from '@/components/common/Spinner';
import { Link } from '@/components/link/Link';
import { useTags } from '@/features/tags';

const Tags = () => {
  const { data, isLoading } = useTags();
  console.log(data);

  return (
    <div className="relative flex-[0_0_25%] w-1/4 bg-zinc-100 pt-1 px-3 py-3 rounded-md ml-auto">
      <p className="mb-1">Popular tags</p>
      {isLoading && (
        <Spinner
          color="primary"
          w="32"
          h="32"
          alignment="center"
        />
      )}
      {!data && !isLoading && (
        <h1>Error, please refresh the page</h1>
      )}
      <div>
        {data?.tags.map((tag: string) => (
          <Link
            href={`/?tag=${tag}`}
            as={`/?tag=${tag}`}
            key={tag}
            className="!inline-block !text-sm py-[2px] px-3 rounded-3xl !bg-slate-500 text-white mr-1 mb-1 transition-colors hover:bg-gray-500"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tags;
