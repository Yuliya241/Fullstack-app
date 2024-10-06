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
import { useGetAllBooksQuery } from '../../store/api/BooksApi';

export default function Home() {
  const [, setCookie] = useCookies(['main']);
  const location = useLocation();
  const [page, setPage] = useState(
    parseInt(location.search?.split('=')[1]) || 1
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch());

  const { data, isFetching } = useGetAllBooksQuery({
    search: search || '',
    page: page,
  });

  useEffect(() => {
    setSearchParams((params) => {
      params.set('page', String(page));
      return params;
    });
    if (data) {
      dispatch(getBooks(data.results));
      setCookie('main', 'books', { secure: true, sameSite: 'lax' });
    }
  }, [page, setSearchParams, data, dispatch]);

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
