import { LIMIT } from '@/config/constants';

export const getRange = (
  start: number,
  end: number
): number[] => {
  return [...Array(end - start + 1)].map(
    (_, i) => start + i
  );
};

type getPageInfoProps = {
  total: number;
  limit?: number;
  page: number;
  articlesPerPage: number;
};

export const getPageInfo = ({
  total,
  limit = LIMIT,
  page,
  articlesPerPage,
}: getPageInfoProps) => {
  const totalPages = Math.ceil(total / limit);
  let currentPage = page;

  let firstPage = Math.max(
    0,
    currentPage - Math.floor(articlesPerPage / 2)
  );
  let lastPage = Math.min(
    totalPages,
    currentPage + Math.floor(articlesPerPage / 2)
  );

  if (lastPage - firstPage + 1 < articlesPerPage) {
    if (currentPage < totalPages / 2) {
      lastPage = Math.min(
        totalPages,
        lastPage +
          (articlesPerPage - (lastPage - firstPage))
      );
    } else {
      firstPage = Math.max(
        1,
        firstPage -
          (articlesPerPage - (lastPage - firstPage))
      );
    }
  }

  if (lastPage - firstPage + 1 > articlesPerPage) {
    if (currentPage > totalPages / 2) {
      firstPage = firstPage + 1;
    } else {
      lastPage = lastPage - 1;
    }
  }

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPreviousPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages;

  return {
    firstPage,
    lastPage,
    previousPage,
    nextPage,
    hasPreviousPage,
    hasNextPage,
    totalPages,
  };
};
