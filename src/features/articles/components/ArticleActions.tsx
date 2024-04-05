import { useUser } from '@/features/auth';
import { ArticleType } from '..';
import checkLogin from '@/utils/checkLogin';
import { Button } from '@/components/button';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi2';
import { Conditional } from '@/components/common/Conditional';
import { CiEdit } from 'react-icons/ci';

export default function ArticleActions({
  article,
}: ArticleType) {
  const user = useUser();
  const isLoggedIn = checkLogin(user.data);

  const canModify =
    isLoggedIn &&
    user.data?.user.username === article.author.username;

  if (user.data && !canModify) {
    return (
      <div className="flex flex-wrap justify-center text-left md:ml-8 gap-2 my-4 h-8">
        <Button
          variant="outline"
          className="action-button"
          icon={<FiPlus />}
        >
          <span className="w-full">
            Follow {article.author.username}
          </span>
        </Button>
        <Button
          variant="outline"
          className="action-button text-neutral-500 border-neutral-500 hover:bg-neutral-500"
          icon={<HiHeart />}
        >
          <span className="w-full">
            Favorite Article ({article.favoritesCount})
          </span>
        </Button>
      </div>
    );
  }

  return (
    <Conditional condition={canModify}>
      <div className="flex flex-wrap justify-center text-left md:ml-8 gap-2 my-4 h-8">
        <Button
          variant="outline"
          className="action-button"
          icon={<CiEdit />}
        >
          <span className="w-full">Edit Article</span>
        </Button>
        <Button
          variant="outline"
          className="action-button text-red-400 border-red-400 hover:bg-red-400"
          icon={<FiTrash />}
        >
          <span className="w-full">Delete Article</span>
        </Button>
      </div>
    </Conditional>
  );
}
