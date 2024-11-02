import { CartItem, FavoriteBook } from '../../interfaces/interfaces';
import { RootState } from '../store';

export const selectSearch = () => (state: RootState) => state.search.search;

export const selectFavorites = () => (state: RootState) =>
  state.favorite.favoriteBooks;

export const selectFavoriteBook = (id: number) => (state: RootState) =>
  state.favorite.favoriteBooks.some((item: FavoriteBook) => {
    return item.book.id === id;
  });

export const selectCart = () => (state: RootState) => state.cart.cartItems;

export const selectTotalPrice = () => (state: RootState) => state.cart.total;

export const selectCartItem = (id: number) => (state: RootState) =>
  state.cart.cartItems.some((item: CartItem) => {
    return item.book_id === id;
  });
