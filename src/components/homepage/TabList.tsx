import { useRouter } from 'next/router';
import { CustomLink } from '../common/CustomLink';
import NavLink from '../common/NavLink';
import { Conditional } from '../common/Conditional';
import clsx from 'clsx';
import { FiHash } from 'react-icons/fi';
import storage from '@/utils/storage';
import { Button } from '../button';

const TabList = () => {
  const router = useRouter();
  const {
    query: { tag },
  } = router;
  const user = storage.getUser();

  return (
    <div className="h-[42px]">
      <ul className="flex items-center h-full">
        {/* this is rendered when no user is logged in */}
        <Conditional condition={!!user}>
          {' '}
          <li>
            <NavLink
              href={`/follow=${user?.user?.username}`}
              as="/"
              className={clsx(
                !tag &&
                  'text-primary border-b-2 border-b-primary transition-all',
                'px-4 py-[10px]'
              )}
            >
              Your Feed
            </NavLink>
          </li>
        </Conditional>
        <li>
          <NavLink
            href="/"
            as="/"
            className={clsx(
              !tag && '',
              !user &&
                'text-primary border-b-2 border-b-primary transition-all',
              'px-4 py-[10px]'
            )}
          >
            Global Feed
          </NavLink>
        </li>
        <Conditional condition={!!tag}>
          <li>
            <CustomLink
              href={`/?tag=${tag}`}
              as={`/?tag=${tag}`}
              className={clsx(
                !!tag &&
                  'text-primary border-b-2 border-b-primary transition-all',
                'px-4 py-[10px] flex items-center'
              )}
            >
              <FiHash />
              {tag}
            </CustomLink>
          </li>
        </Conditional>
      </ul>
    </div>
  );
};

export default TabList;
