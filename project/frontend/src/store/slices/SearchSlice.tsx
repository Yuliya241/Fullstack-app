import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Book, SearchState } from '../../interfaces/interfaces';

const initialState: SearchState = {
  books: [],
  search: localStorage.getItem('search') ? localStorage.getItem('search') : '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      localStorage.setItem('search', action.payload);
      state.search = action.payload;
    },
  },
});

export const { getBooks, setSearch } = searchSlice.actions;
