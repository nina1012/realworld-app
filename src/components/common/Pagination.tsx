import { usePagination } from '@/stores/pagination';
import {
  getPageInfo,
  getRange,
} from '@/utils/paginationUtils';
import clsx from 'clsx';
import { Link } from '../link/link';
import {
  GrFormNext,
  GrFormPrevious,
} from 'react-icons/gr';

type PaginationProps = {
  total: number;
  limit?: number;
  articlesPerPage: number;
};

export default function Pagination({
  total,
  limit = 10,
  articlesPerPage,
}: PaginationProps) {
  const { currentPage, setCurrentPage } = usePagination();

  const {
    firstPage,
    lastPage,
    hasPreviousPage,
    hasNextPage,
  } = getPageInfo({
    limit,
    articlesPerPage,
    total,
    page: currentPage,
  });

  const pages =
    total > 0 ? getRange(firstPage, lastPage) : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <nav
      aria-label="pagination"
      className="w-full h-full"
    >
      <ul className="list-style-none py-2 flex items-center justify-center">
        <li
          onClick={() =>
            handlePageChange(currentPage - 1)
          }
          className={clsx(
            !hasPreviousPage
              ? 'pointer-events-none opacity-25'
              : ''
          )}
        >
          <Link className="pagination-prev-next" href="/">
            <span className="mr-2 font-lg">
              <GrFormPrevious />
            </span>{' '}
            Previous
          </Link>
        </li>
        {/* <li>
          <a
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#!"
          >
            1
          </a>
        </li>
        <li aria-current="page">
          <a
            className="relative block rounded bg-success-100 px-3 py-1.5 text-sm font-medium text-success-700 transition-all duration-300"
            href="#!"
          >
            2
            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
              (current)
            </span>
          </a>
        </li>
        <li>
          <a
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="#!"
          >
            3
          </a>
        </li> */}
        {pages.map((page) => {
          const isCurrent = !currentPage
            ? page === 0
            : page === currentPage;
          console.log(page);

          return (
            <li
              key={page}
              className={
                isCurrent
                  ? 'pagination-link active [clip:rect(0,0,0,0)] pointer-events-none'
                  : 'pagination-link'
              }
              aria-current="page"
              onClick={() => handlePageChange(page)}
            >
              <Link href="/" className="page-link">
                {page + 1}
              </Link>
            </li>
          );
        })}
        <li
          onClick={() =>
            handlePageChange(currentPage + 1)
          }
          className={clsx(
            !hasNextPage
              ? 'pointer-events-none opacity-25'
              : ''
          )}
        >
          <Link className="pagination-prev-next" href="/">
            Next{' '}
            <span className="ml-2 font-lg">
              <GrFormNext />
            </span>{' '}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
