import { useRouter } from 'next/router';
import { CustomLink } from '../common/CustomLink';
import NavLink from '../common/NavLink';
import { Conditional } from '../common/Conditional';
import clsx from 'clsx';
import { FiHash } from 'react-icons/fi';
import checkLogin from '@/utils/checkLogin';
import { AuthUser, useUser } from '@/features/auth';

const TabList = () => {
  const router = useRouter();
  const {
    query: { tag },
  } = router;
  const user = useUser();
  const isLoggedIn = checkLogin(user.data);

  // default tabs when user is not logged in
  if (!isLoggedIn) {
    return (
      <div className="h-[42px] -mb-[1px]">
        <ul className="flex items-center h-full">
          <li className="nav-item">
            <NavLink
              href="/"
              as="/"
              className={clsx(
                !tag && 'tab-link active-tab',
                !!tag && !isLoggedIn && 'tab-link',
                !!isLoggedIn && !!tag && 'tab-link'
              )}
            >
              Global Feed
            </NavLink>
          </li>

          <Conditional condition={!!tag}>
            <li className="nav-item">
              <CustomLink
                href={`/?tag=${tag}`}
                as={`/?tag=${tag}`}
                className={clsx(
                  !!tag && 'active-tab tab-link'
                )}
              >
                <FiHash /> {tag}
              </CustomLink>
            </li>
          </Conditional>
        </ul>
      </div>
    );
  }

  // when user is logged in
  return (
    <div className="h-[42px] -mb-[1px]">
      <ul className="flex items-center h-full">
        <li className="nav-item">
          <NavLink
            href={`/?follow=${user.data?.user.username}`}
            as={`/?follow=${user.data?.user.username}`}
            className={!tag ? 'tab-link' : 'tab-link'}
          >
            Your Feed
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            href="/"
            as="/"
            className={clsx(
              !tag && 'tab-link active-tab',
              !!tag && !isLoggedIn && 'tab-link',
              !!isLoggedIn && !!tag && 'tab-link'
            )}
          >
            Global Feed
          </NavLink>
        </li>

        <Conditional condition={!!tag}>
          <li className="nav-item">
            <CustomLink
              href={`/?tag=${tag}`}
              as={`/?tag=${tag}`}
              className={clsx(
                !!tag && 'active-tab tab-link'
              )}
            >
              <FiHash /> {tag}
            </CustomLink>
          </li>
        </Conditional>
      </ul>
    </div>
  );
};

export default TabList;
