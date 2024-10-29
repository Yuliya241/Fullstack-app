import { useEffect } from 'react';
import FavoriteList from '../../components/Favorite-list/Favorite-list';
import Loader from '../../components/Loader/Loader';
import { Box, Typography } from '@mui/material';
import { getFavorites } from '../../store/slices/FavoriteSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useGetFavoriteBooksQuery } from '../../store/api/BooksApi';
import { selectFavorites } from '../../store/selectors/Selectors';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favoriteBooks = useAppSelector(selectFavorites());

  const { data, isFetching } = useGetFavoriteBooksQuery();

  useEffect(() => {
    if (data) {
      dispatch(getFavorites(data.results));
    }
  }, [data]);

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
      <Typography variant="h4" sx={{ color: '#03A9F4', fontStyle: 'italic' }}>
        Избранное
      </Typography>
      {isFetching ? (
        <Loader />
      ) : (
        favoriteBooks && <FavoriteList results={favoriteBooks} />
      )}
    </Box>
  );
};

export default Favorites;
