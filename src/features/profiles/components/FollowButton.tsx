import { Button } from '@/components/button';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useFollow } from '../api/follow-profile';

import { ProfileType } from '../types';
import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

type FollowButtonProps = {
  canFollow: boolean;
  profile: ProfileType | null;
  initialFollowing: boolean;
};

export const FollowButton = ({
  canFollow,
  profile,
  initialFollowing,
}: FollowButtonProps) => {
  const router = useRouter();
  const { username } = router.query;

  const { follow, unfollow } = useFollow(
    username as string
  );
  const [following, setFollowing] = useState<boolean>(
    initialFollowing
  );

  const handleClick = async () => {
    // allow user to follow an user only when user is logged in
    if (!canFollow) {
      router.push('/auth/login');
      return;
    }
    if (!profile) return;

    if (following) {
      await unfollow();
      setFollowing(false);
    } else {
      await follow();
      setFollowing(true);
    }
  };

  return (
    <Button
      className={clsx(
        'flex items-center text-sm rounded-sm transition-colors h-8 w-auto min-w-min',
        following
          ? 'text-red-400 border-red-400 border-[1px] hover:text-white hover:bg-primary'
          : 'bg-transparent hover:bg-primary hover:text-white'
      )}
      onClick={() => {
        handleClick();
      }}
    >
      {following ? <FiMinus /> : <FiPlus />}
      {following ? `Following` : 'Follow'}
    </Button>
  );
};
