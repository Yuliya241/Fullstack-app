import { useEffect, useState } from 'react';
import { FavoriteBook, FavoriteResponse } from '../../interfaces/interfaces';
import FavoriteList from '../../components/Favorite-list/Favorite-list';
import { API } from '../../enums/enums';
import Loader from '../../components/Loader/Loader';
import { Box, Typography } from '@mui/material';
import { getFavorites } from '../../store/slices/FavoriteSlice';
import { useAppDispatch } from '../../store/store';

const Favorites = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<FavoriteBook[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchFavoriteList();
  }, []);

  const fetchFavoriteList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API.FAVORITE_LIST, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const favorites: FavoriteResponse = await response.json();

      if (response.ok) {
        setIsLoading(false);
        setFavoriteBooks(favorites.results);
        dispatch(getFavorites(favorites.results));
      }
    } catch (e) {
      console.error(e);
    }
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
      <Typography variant="h4" sx={{ color: '#03A9F4', fontStyle: 'italic' }}>
        Избранное
      </Typography>
      {isLoading ? (
        <Loader />
      ) : (
        favoriteBooks && <FavoriteList results={favoriteBooks} />
      )}
    </Box>
  );
};

export default Favorites;
