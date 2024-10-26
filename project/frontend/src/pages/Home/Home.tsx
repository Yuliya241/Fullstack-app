import { useEffect, useState } from 'react';
import BookList from '../../components/Book-list/Book-list';
import { Box, PaginationItem } from '@mui/material';
import Loader from '../../components/Loader/Loader';
import { useCookies } from 'react-cookie';
import Pagination from '@mui/material/Pagination';
import {
  Link as NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import SearchBar from '../../components/Search-bar/Search-bar';
import { selectSearch } from '../../store/selectors/Selectors';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getBooks, setSearch } from '../../store/slices/SearchSlice';
import { getFavorites } from '../../store/slices/FavoriteSlice';
import { useGetAllBooksQuery, useGetFavoriteBooksQuery, useGetUserCartQuery } from '../../store/api/BooksApi';
// import { FavoriteResponse } from '../../interfaces/interfaces';
// import { API } from '../../enums/enums';
import { Cookies } from 'react-cookie';
import { getCartItems } from '../../store/slices/CartSlice';

export default function Home() {
  const [, setCookie] = useCookies(['main']);
  const location = useLocation();
  const [page, setPage] = useState(
    parseInt(location.search?.split('=')[1]) || 1
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const cookies = new Cookies();
  const userId = cookies.get('userId');
  const token = cookies.get('userToken');

  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch());

  const { data, isFetching } = useGetAllBooksQuery({
    search: search || '',
    page: page,
  });

  const { data: cartItems } = useGetUserCartQuery(userId || '');
  const { data: favoriteItems } = useGetFavoriteBooksQuery();

  useEffect(() => {
    setSearchParams((params) => {
      params.set('page', String(page));
      return params;
    });
    if (data && cartItems && favoriteItems) {
      dispatch(getBooks(data.results));
      dispatch(getCartItems(cartItems));
      dispatch(getFavorites(favoriteItems.results));
      setCookie('main', 'books', { secure: true, sameSite: 'lax' });
    }
  }, [page, setSearchParams, data, dispatch, userId, token, cartItems]);

  // const fetchFavoriteList = async () => {
  //   try {
  //     const response = await fetch(API.FAVORITE_LIST, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const favorites: FavoriteResponse = await response.json();

  //     if (response.ok) {
  //       dispatch(getFavorites(favorites.results));
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const clickSearchButton = (): void => {
    setPage(1);
    dispatch(setSearch(searchQuery));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '4rem 2.5rem',
        rowGap: '1.5rem',
      }}
    >
      <SearchBar onSearch={clickSearchButton} />
      {isFetching ? (
        <Loader />
      ) : (
        data?.results && (
          <>
            <Pagination
              sx={{
                alignSelf: 'flex-end',
              }}
              page={page}
              count={Math.ceil(data.count / 50)}
              onChange={(_, num) => setPage(num)}
              showFirstButton
              showLastButton
              color="secondary"
              renderItem={(item) => (
                <PaginationItem
                  component={NavLink}
                  to={`/?page=${item.page}`}
                  {...item}
                />
              )}
            />
            <BookList results={data.results} />
          </>
        )
      )}
    </Box>
  );
}
