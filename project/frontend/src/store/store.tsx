import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { booksApi } from './api/BooksApi';
import { searchSlice } from './slices/SearchSlice';
import { favoriteSlice } from './slices/FavoriteSlice';

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    search: searchSlice.reducer,
    favorite: favoriteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 100 },
      serializableCheck: { warnAfter: 100 },
    }).concat(booksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
