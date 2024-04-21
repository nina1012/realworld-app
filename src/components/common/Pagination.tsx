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
    total,
    limit,
    page: currentPage,
    articlesPerPage,
  });

  const pages =
    total > 0 ? getRange(firstPage, lastPage) : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <nav
      aria-label="pagination"
      className="w-full h-full bg-neutral-100 py-4"
    >
      <ul className="list-style-none py-2 flex items-center justify-center">
        {/* previous button */}
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
          <Link className="pagination-prev-next" href="">
            <span className="mr-2 font-lg">
              <GrFormPrevious />
            </span>{' '}
            Previous
          </Link>
        </li>

        {/* indicators */}
        {pages.map((page) => {
          const activePage = page === currentPage;
          return (
            <li
              key={page}
              className={
                activePage
                  ? 'pagination-link active'
                  : 'pagination-link'
              }
              onClick={() => handlePageChange(page)}
            >
              <Link href="" className="">
                {page + 1}
              </Link>
            </li>
          );
        })}
        {/* next button */}
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
          <Link className="pagination-prev-next" href="">
            Next{' '}
            <span className="ml-2 font-lg">
              <GrFormNext />
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
