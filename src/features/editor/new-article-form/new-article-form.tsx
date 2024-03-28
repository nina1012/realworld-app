import { Button } from '@/components/button';
import SectionContainer from '@/components/common/SectionContainer';
import { InputField } from '@/components/form/input-field';
import { CreateArticle } from '@/features/articles';
import { useNotifications } from '@/stores/notifications';
import { FieldError, useForm } from 'react-hook-form';

export type NewArticleFormProps = {
  onSuccess: () => CreateArticle;
};

export const NewArticleForm = ({
  onSuccess,
}: NewArticleFormProps) => {
  const { handleSubmit, register, formState } =
    useForm<CreateArticle>();

  const { showNotification } = useNotifications();

  const onSubmit = (data: CreateArticle) => {
    // submit the article data
    console.log(data);
    showNotification({
      type: 'success',
      title: 'New Article published',
      duration: 1000,
      message: 'Successfully published article',
    });
    //
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
              className="ml-auto"
              variant="solid"
              type="submit"
            >
              Publish article
            </Button>
          </form>
        </div>
      </SectionContainer>
    </div>
  );
};
