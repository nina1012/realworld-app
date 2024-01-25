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
    id?: 'number';
  };
};

export type LoginData = {
  email: string;
  password: string;
};

export type UpdateUser = {
  user: {
    email: 'string';
    password: 'string';
    username: 'string';
    bio: 'string';
    image: 'string';
  };
};
