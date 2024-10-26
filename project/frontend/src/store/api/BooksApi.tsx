import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../enums/enums';
import { Book, BookResponse, CartItem, FavoriteResponse } from '../../interfaces/interfaces';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const token = cookies.get('userToken');

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

    // changeFavoriteStatus: builder.query({
    //   query: (id) => ({
    //     url: `api/books/${id}/favorite`,
    //     method: 'POST',
    // }),
    // }),

    getUserCart: builder.query<CartItem[], number>({
      query: (id) => ({
        url: `cart/${id}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
    }),
    }),

    // postBooksToCart: builder.query<CartItem, CartItem>({
    //   query: (book) => ({
    //     url: `cart/add/`,
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Token ${token}`,
    //     },
    //     body: JSON.stringify(book)
    // }),
    // }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetDetailsBookQuery,
  useGetUserCartQuery,
  useGetFavoriteBooksQuery,
  // usePostBooksToCartQuery
  // useChangeFavoriteStatusQuery
} = booksApi;
