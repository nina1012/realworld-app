import Seo from '@/components/seo/seo';
import { Protected } from '@/features/auth/components/protected';
import { UpdateArticleForm } from '@/features/editor/components/update-article-form';
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
        <UpdateArticleForm onSuccess={onSuccess} />
      </Protected>
    </>
  );
}
