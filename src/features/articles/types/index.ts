import { Entity } from '@/types';

export type Article = Entity & {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  // author: Profile // to do!!!
};

export type CreateArticle = Pick<
  Article,
  'title' | 'description' | 'body' | 'tagList'
>;
