import Seo from '@/components/seo/seo';
import { Protected } from '@/features/auth/components/protected';
import { NewArticleForm } from '@/features/editor/components/new-article-form';
import { useRouter } from 'next/router';

export default function NewPage() {
  const router = useRouter();
  const onSuccess = () => {
    router.replace('/');
  };
  return (
    <>
      <Protected>
        <Seo title="Conduit | New Article" />
        <NewArticleForm onSuccess={onSuccess} />
      </Protected>
    </>
  );
}
