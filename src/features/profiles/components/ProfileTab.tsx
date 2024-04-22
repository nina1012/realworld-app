import NavLink from '@/components/common/NavLink';
import React from 'react';
import { ProfileType } from '../types';

const ProfileTab = ({ profile }: ProfileType) => {
  return (
    <div className="h-[42px] -mb-[1px]">
      <ul className="flex items-center h-full">
        <li className="nav-item">
          <NavLink
            href="/profile/[pid]"
            as={`/profile/${encodeURIComponent(
              profile.username
            )}`}
            className="tab-link active-tab"
          >
            {profile.username.split(' ')[0]}&apos;s
            Articles
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProfileTab;
