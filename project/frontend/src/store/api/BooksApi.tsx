import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../enums/enums';
import { BookResponse } from '../../interfaces/interfaces';

export const booksApi = createApi({
  reducerPath: 'books',
  baseQuery: fetchBaseQuery({ baseUrl: API.ALLBOOKS }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<BookResponse, { search: string; page: number }>({
      query: ({ search, page }) => `?search=${search}&page=${page}`,
    }),

    // getDetailedBook: builder.query<Book, string>({
    //   query: (id) => `${id}`,
    // }),
  }),
});

export const { useGetAllBooksQuery } = booksApi;
// export const { useGetAllBooksQuery, useGetDetailedBookQuery } = booksApi;
