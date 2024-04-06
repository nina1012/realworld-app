import { Button } from '@/components/button';
import SectionContainer from '@/components/common/SectionContainer';
import { InputField } from '@/components/form/input-field';
import {
  ArticleType,
  useArticle,
} from '@/features/articles';
import { useUpdateArticle } from '@/features/articles/api/update-article';
import { useNotifications } from '@/stores/notifications';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FieldError, useForm } from 'react-hook-form';

export type UpdateArticleFormProps = {
  onSuccess: () => void;
};

export const UpdateArticleForm = ({
  onSuccess,
}: UpdateArticleFormProps) => {
  const {
    query: { slug },
  } = useRouter();
  const { showNotification } = useNotifications();
  const { data } = useArticle(slug as string); // getting article from the react-query

  const { handleSubmit, register, formState, watch } =
    useForm<ArticleType>({
      defaultValues: {
        article: {
          title: data?.article.title,
          description: data?.article.description,
          body: data?.article.body,
          tagList: data?.article.tagList,
        },
      },
    });

  const updatedArticle = watch();
  const { submit: UpdatedArticle, isPending } =
    useUpdateArticle({
      onSuccess: (data: ArticleType) => {
        onSuccess();
        return data;
      },
      slug: slug as string,
      updatedArticle,
    });

  const onSubmit = async (data: ArticleType) => {
    try {
      UpdatedArticle(data);
      showNotification({
        type: 'success',
        title: 'Article successfully updated',
        duration: 1000,
        message: 'Successfully updated article',
      });
    } catch (error) {
      console.error('Error updating article', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to update the article',
      });
    }
  };

  return (
    <div className="py-4 h-[calc(100vh-100px)]">
      <SectionContainer styles="text-center">
        <div>
          <div className="mb-4">
            <h2 className="text-[40px] font-medium mb-2">
              Update article
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form"
          >
            <InputField
              type="text"
              label="Article Title"
              error={
                formState.errors['article'] as FieldError
              }
              {...register('article.title', {
                required: true,
              })}
            />
            <InputField
              type="text"
              label="Article Description"
              error={
                formState.errors['article'] as FieldError
              }
              {...register('article.description', {
                required: true,
              })}
            />
            <InputField
              type="textarea"
              label="Article Body (in markdown)"
              error={
                formState.errors['article'] as FieldError
              }
              {...register('article.body', {
                required: true,
              })}
            />
            <Button
              className={clsx(
                // isPending && 'opacity-80',
                'ml-auto'
              )}
              variant="solid"
              type="submit"
              //   isdisabled={isPending}
            >
              {/* {isPending
                ? 'Publishing...' */}
              Publish article
            </Button>
          </form>
        </div>
      </SectionContainer>
    </div>
  );
};
