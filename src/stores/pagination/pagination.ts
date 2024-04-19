import { createStore, useStore } from 'zustand';

type PaginationStore = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const paginationStore =
  createStore<PaginationStore>((set) => ({
    currentPage: 0,
    setCurrentPage: (page) => {
      set({ currentPage: page });
    },
  }));

export const usePagination = () =>
  useStore(paginationStore);
