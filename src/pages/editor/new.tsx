import Seo from '@/components/seo/seo';
import { NewArticleForm } from '@/features/editor/components/new-article-form';
import { useRouter } from 'next/router';

export default function NewPage() {
  const router = useRouter();
  const onSuccess = () => {
    router.replace('/');
  };
  return (
    <>
      <Seo title="Conduit | New Article" />
      <NewArticleForm onSuccess={onSuccess} />
    </>
  );
}
