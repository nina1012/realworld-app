import { useRouter } from 'next/router';
import { CustomLink } from '../common/CustomLink';
import NavLink from '../common/NavLink';
import { Conditional } from '../common/Conditional';
import clsx from 'clsx';
import { FiHash } from 'react-icons/fi';
import storage from '@/utils/storage';

const TabList = () => {
  const router = useRouter();
  const {
    query: { tag },
  } = router;
  const user = storage.getUser();

  return (
    <div className="h-[42px] -mb-[1px]">
      <ul className="flex items-center h-full">
        {/* this is rendered when user is logged in */}
        <Conditional condition={!!user}>
          <li>
            <NavLink
              href={`/follow=${user?.user?.username}`}
              as="/"
              className={clsx(
                !tag ? 'tab-link' : 'tab-link'
              )}
            >
              Your Feed
            </NavLink>
          </li>
        </Conditional>
        {/* this is rendered when user is logged in and not */}
        <li>
          <NavLink
            href="/"
            as="/"
            className={clsx(
              !tag && 'tab-link active-tab',
              !!tag && !user && 'tab-link',
              !!user && !!tag && 'tab-link'
            )}
          >
            Global Feed
          </NavLink>
        </li>
        {/* this is rendered only when user chooses the tag to filter articles */}
        <Conditional condition={!!tag}>
          <li>
            <CustomLink
              href={`/?tag=${tag}`}
              as={`/?tag=${tag}`}
              className={clsx(
                !!tag && 'active-tab tab-link'
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
