export const IS_DEVELOPMENT =
  process.env.NODE_ENV === 'development';

export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_PRODUCTION =
  process.env.NODE_ENV === 'production';

export const APP_NAME = 'conduit';

export const BASE_URL_API =
  'https://api.realworld.io/api';
export const BASE_URL = IS_DEVELOPMENT
  ? 'http://localhost:3000'
  : 'https://realworld-app-alpha.vercel.app';

export const LIMIT = 20;
