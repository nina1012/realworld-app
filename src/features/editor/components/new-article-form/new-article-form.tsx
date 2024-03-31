import { Button } from '@/components/button';
import SectionContainer from '@/components/common/SectionContainer';
import { InputField } from '@/components/form/input-field';
import { CreateArticle } from '@/features/articles';
import { useCreateNewArticle } from '@/features/articles/api/create-new-article';
import { useNotifications } from '@/stores/notifications';
import storage from '@/utils/storage';
import clsx from 'clsx';
import { FieldError, useForm } from 'react-hook-form';

export type NewArticleFormProps = {
  onSuccess: () => void;
};

export const NewArticleForm = ({
  onSuccess,
}: NewArticleFormProps) => {
  const { handleSubmit, register, formState, watch } =
    useForm<CreateArticle>({
      defaultValues: {
        article: {
          title: '',
          description: '',
          body: '',
          tagList: [],
        },
      },
    });
  const { showNotification } = useNotifications();

  const article = watch(); // Get the form data
  const { submit: createArticle, isPending } =
    useCreateNewArticle({
      onSuccess: () => {
        onSuccess();
      },
      article,
      token: storage.getUser()?.user?.token || '',
    });

  const onSubmit = async (data: CreateArticle) => {
    try {
      await createArticle(data);
      showNotification({
        type: 'success',
        title: 'New Article published',
        duration: 1000,
        message: 'Successfully published article',
      });
    } catch (error) {
      // Handle any errors
      console.error('Error creating article:', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to publish article',
      });
    }
  };

  return (
    <div className="py-4 h-[calc(100vh-100px)]">
      <SectionContainer styles="text-center">
        <div>
          <div className="mb-4">
            <h2 className="text-[40px] font-medium mb-2">
              New Article
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
                isPending && 'opacity-80',
                'ml-auto'
              )}
              variant="solid"
              type="submit"
              isdisabled={isPending}
            >
              {isPending
                ? 'Publishing...'
                : 'Publish article'}
            </Button>
          </form>
        </div>
      </SectionContainer>
    </div>
  );
};
