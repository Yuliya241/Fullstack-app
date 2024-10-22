import { FavoriteBook } from '../../interfaces/interfaces';
import { RootState } from '../store';

export const selectSearch = () => (state: RootState) => state.search.search;

export const selectFavorites = () => (state: RootState) =>
  state.favorite.favoriteBooks;

export const selectFavoriteBook = (id: number) => (state: RootState) =>
  state.favorite.favoriteBooks.some((item: FavoriteBook) => {
    return item.book.id === id;
  });
