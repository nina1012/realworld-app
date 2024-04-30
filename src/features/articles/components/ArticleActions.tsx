import { useUser } from '@/features/auth';
import { ArticleType } from '..';
import checkLogin from '@/utils/checkLogin';
import { Button } from '@/components/button';
import { FiTrash } from 'react-icons/fi';
import { Conditional } from '@/components/common/Conditional';
import { CiEdit } from 'react-icons/ci';
import { Link } from '@/components/link/link';
import { useRouter } from 'next/router';
import { useDeleteArticle } from '../api/delete-article';

export default function ArticleActions({
  article,
}: ArticleType) {
  const user = useUser();
  const isLoggedIn = checkLogin(user.data);
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const canModify =
    isLoggedIn &&
    user.data?.user.username === article.author.username;

  // delete an article
  const { submit: DeleteArticle } = useDeleteArticle({
    slug: slug as string,
  });

  return (
    <Conditional condition={canModify}>
      <div className="flex flex-wrap justify-center text-left md:ml-8 gap-2 my-4 h-8">
        <Link
          className="action-link button-like-link"
          icon={<CiEdit />}
          href={`/editor/${slug}`}
        >
          <span className="w-full">Edit Article</span>
        </Link>
        <Button
          className="action-link text-red-400 border-red-400 hover:bg-red-400 button-like-link"
          icon={<FiTrash />}
          onClick={() => {
            if (
              prompt(
                'Do you really want to delete this article? Type yes or no (lowercase)'
              ) === 'yes'
            ) {
              DeleteArticle();
              router.push('/');
            }
          }}
        >
          <span className="w-full">Delete Article</span>
        </Button>
      </div>
    </Conditional>
  );
}
