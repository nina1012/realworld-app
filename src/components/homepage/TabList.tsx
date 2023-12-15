import { useRouter } from 'next/router';
import NavLink from '../common/NavLink';
import clsx from 'clsx';

const TabList = () => {
  const router = useRouter();
  const {
    query: { tag },
  } = router;

  return (
    <div className="h-[42px]">
      <ul className="flex items-center h-full">
        {/* this is rendered when no user is logged in */}
        <li>
          <NavLink
            href="/"
            as="/"
            className={clsx(
              !tag &&
                'text-primary border-b-2 border-b-primary',
              'px-4 py-[10px]'
            )}
          >
            Global Feed
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TabList;
