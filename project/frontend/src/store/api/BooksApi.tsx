import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, COOKIES } from '../../enums/enums';
import { AuthResponse, Book, BookResponse, CartItem, FavoriteResponse } from '../../interfaces/interfaces';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const token = cookies.get(COOKIES.TOKEN);

export const booksApi = createApi({
  reducerPath: 'books',
  baseQuery: fetchBaseQuery({ baseUrl: API.ALLBOOKS }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<BookResponse, { search: string; page: number }>({
      query: ({ search, page }) => `api/books/?search=${search}&page=${page}`,
    }),

    getDetailsBook: builder.query<Book, string>({
      query: (id) => `api/books/${id}`,
    }),

    getFavoriteBooks: builder.query<FavoriteResponse, void>({
      query: () => `api/books/favorites`,
    }),

    getUserCart: builder.query<CartItem[], number>({
      query: (id) => ({
        url: `cart/${id}/`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }),
    }),

    getProfile: builder.query<AuthResponse, void>({
      query: () => ({
        url: `api/profile/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
    }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetDetailsBookQuery,
  useGetUserCartQuery,
  useGetFavoriteBooksQuery,
  useGetProfileQuery
} = booksApi;
