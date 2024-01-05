import { Entity } from '@/types';

export type RegisterData = {
  username: 'string';
  email: 'string';
  password: 'string';
};

export type AuthUser = {
  user: {
    username: 'string';
    email: 'string';
    token: 'string';
    bio: 'string';
    image: 'string';
  };
};

export type LoginData = {
  email: string;
  password: string;
};
