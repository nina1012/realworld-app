import { ProfileType } from '@/features/profiles/types/ProfileType';

export type CommentType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: ProfileType['profile'];
};

export type CommentsType = {
  comments: CommentType[];
};
