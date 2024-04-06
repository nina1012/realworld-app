import Seo from '@/components/seo/seo';
import { UpdateArticleForm } from '@/features/editor/components/uodate-article-form/update-article-form';
import { useRouter } from 'next/router';

export default function NewPage() {
  const router = useRouter();
  const onSuccess = () => {
    router.replace('/');
  };
  return (
    <>
      <Seo title="Conduit | New Article" />
      <UpdateArticleForm onSuccess={onSuccess} />
    </>
  );
}
