import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Book, FavoriteBook, FavoriteState } from '../../interfaces/interfaces';

const initialState: FavoriteState = {
  favoriteBooks: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Book>) => {
      state.favoriteBooks.push({ book: action.payload });
    },
    removeFromFavorites: (state, action: PayloadAction<Book>) => {
      state.favoriteBooks = state.favoriteBooks.filter((item) => {
        return item.book.id !== action.payload.id;
      });
    },
    getFavorites: (state, action: PayloadAction<FavoriteBook[]>) => {
      state.favoriteBooks = action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, getFavorites } =
  favoriteSlice.actions;
