import { Entity } from '@/types';

export type Articles = {
  articles: Article[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  createdAt: Date;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};

export type CreateArticle = Pick<
  Article,
  'title' | 'description' | 'body' | 'tagList'
>;
