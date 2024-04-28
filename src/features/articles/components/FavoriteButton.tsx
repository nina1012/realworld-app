import { Button } from '@/components/button';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { AiFillHeart } from 'react-icons/ai';
import { useFavoriteArticle } from '../api/favorite-article';
import { useState } from 'react';
import { HiOutlineHeart } from 'react-icons/hi2';
import { ArticleType } from '../types';

type FavoriteButtonType = {
  slug: string;
  initialFavoritesCount: number;
  initialFavorited: boolean;
  canFavorite: boolean;
};

export const FavoriteButton = ({
  slug,
  initialFavoritesCount,
  initialFavorited,
  canFavorite,
}: FavoriteButtonType) => {
  const router = useRouter();
  const { favorite, unfavorite } =
    useFavoriteArticle(slug);

  const [favoritesCount, setFavoritesCount] = useState(
    initialFavoritesCount
  );
  const [favorited, setFavorited] = useState(
    initialFavorited
  );

  const handleClick = async () => {
    // allow user to favorite an article only when user is logged in
    if (!canFavorite) {
      router.push('/auth/login');
      return;
    }
    if (favorited) {
      await unfavorite();
      setFavoritesCount((prevCount) => prevCount - 1);
      setFavorited(false);
    } else {
      await favorite();
      setFavoritesCount((prevCount) => prevCount + 1);
      setFavorited(true);
    }
  };
  return (
    <Button
      className={clsx(
        'flex items-center text-sm rounded-sm transition-colors h-8 w-auto min-w-min',
        favorited
          ? 'text-red-400 border-red-400 border-[1px] hover:text-white hover:bg-primary'
          : 'bg-transparent hover:bg-primary hover:text-white'
      )}
      onClick={() => {
        handleClick();
      }}
      icon={
        favorited ? <AiFillHeart /> : <HiOutlineHeart />
      }
    >
      <span>{favoritesCount}</span>
    </Button>
  );
};
