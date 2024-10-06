import { RootState } from '../store';

export const selectSearch = () => (state: RootState) => state.search.search;

// export const selectPage = () => (state: RootState) => state.search.page;

// export const selectTotal = () => (state: RootState) => state.search.total;

// export const selectSelectedBooks = () => (state: RootState) =>
//   state.selected.selectedBooks;

// export const selectSelectedBooksCount = () => (state: RootState) =>
//   state.selected.selectedBooks.length;

// export const selectSelectedBook = (id: string) => (state: RootState) =>
//   state.selected.selectedBooks.some((item: Book) => {
//     const itemId = item.url.split('/').filter(Boolean).slice(-1).join('');
//     return itemId === id;
//   });
