import { Entity } from '@/types';

export type ArticlesType = {
  articles: Omit<ArticleType['article'], 'article'>[];
  articlesCount?: number;
};
export type ArticleType = {
  article: {
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
};

export type NewArticle = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
};
