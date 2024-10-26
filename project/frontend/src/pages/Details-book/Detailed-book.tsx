import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDetailsBookQuery } from '../../store/api/BooksApi';
import Loader from '../../components/Loader/Loader';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { API } from '../../enums/enums';
import { Book } from '../../interfaces/interfaces';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/slices/FavoriteSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectCartItem, selectFavoriteBook } from '../../store/selectors/Selectors';
import { Cookies } from 'react-cookie';
import { addBookToCart, removeBookFromCart } from '../../store/slices/CartSlice';

const DetailsBook = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectFavoriteBook(Number(id)));
  const isInCart = useAppSelector(selectCartItem(Number(id)));
  const cookies = new Cookies();
  const userId = cookies.get('userId');
  const token = cookies.get('userToken');

  const { data, isFetching } = useGetDetailsBookQuery(id || '');

  const book = {
    book_id: Number(id),
    image: data?.image || '',
    title: data?.title || '',
    author: data?.author || '',
    oldprice: data?.oldprice || 0,
    specialprice: data?.specialprice || 0,
    regularprice: data?.regularprice || 0,
    quantity: 1,
    user: userId
}

  const closeDetailed = () => {
    setIsOpen(false);
    navigate(-1);
  };

  const changeFavoriteStatus = async (book: Book) => {
    try {
      const response = await fetch(`${API.ALLBOOKS}${id}/favorite`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return !isFavorite
          ? dispatch(addToFavorites(book))
          : dispatch(removeFromFavorites(book));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = async () => {
    try {
      const response = await fetch(API.CART_ADD, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        dispatch(addBookToCart(book))
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteFromCart = async () => {
    try {
      const response = await fetch(`${API.CART_DELETE}${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        dispatch(removeBookFromCart(book))
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        justifyContent: 'center',
        margin: '0 auto',
        padding: '4rem',
      }}
    >
      {isFetching && !isOpen ? (
        <Loader />
      ) : (
        <Box
          sx={{
            maxWidth: '50rem',
            margin: '0 auto',
          }}
        >
          <Paper
            sx={{
              display: 'flex',
              rowGap: '1rem',
              flexDirection: 'column',
              padding: '1.2rem',
              backgroundColor: '#f3f8f3',
              transition: 'all 0.2s linear',
              '&:hover': {
                boxShadow: '0 10px 20px #56325666',
              },
            }}
          >
            <Button
              sx={{
                alignSelf: 'flex-end',
                transition: 'all 0.4s ease',
                backgroundColor: '#000000',
                color: '#ffffff',
                margin: '0 5px',
                '&:hover': {
                  color: '#000000',
                  backgroundColor: '#ffffff',
                },
              }}
              type="button"
              onClick={closeDetailed}
            >
              Закрыть
            </Button>
            <Box
              sx={{
                display: 'flex',
                backgroundColor: '#ffffff',
                padding: '1rem',
                borderRadius: '4px',
              }}
            >
              <img
                src={data?.image}
                alt={data?.title}
                style={{ width: '100%', objectFit: 'cover' }}
              />
              <Stack sx={{ rowGap: '1rem', justifyContent: 'space-evenly' }}>
                <Typography
                  sx={{
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textAlign: 'center',
                  }}
                >
                  {data?.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#23b4ca',
                    fontSize: '0.9rem',
                  }}
                >
                  <span style={{ color: '#000000' }}>Автор: </span>
                  {data?.author}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    paddingTop: '5px',
                  }}
                >
                  {data?.regularprice === 0 ? (
                    <>
                      <Typography
                        sx={{
                          fontSize: '13px',
                          color: '#555',
                          textDecoration: 'line-through',
                          fontWeight: 'normal',
                          marginRight: '5px',
                        }}
                      >
                        {data?.oldprice} руб
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '18px',
                          lineHeight: '1.2',
                          color: '#555',
                          fontWeight: 'bold',
                        }}
                      >
                        {data?.specialprice} руб
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: '18px',
                        lineHeight: '1.2',
                        color: '#555',
                        fontWeight: 'bold',
                      }}
                    >
                      {data?.regularprice} руб
                    </Typography>
                  )}
                </Box>
                  {!isInCart ? (
                  <Button
                      variant="contained"
                      onClick={addToCart}
                  sx={{
                    color: '#555',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    borderRadius: '4px',
                    backgroundColor: '#FFC000',
                    transition: 'all 0.4s ease',
                    '.MuiButtonBase-root': {
                      color: '#555',
                    },
                    '&.MuiButton-outlinedPrimary': {
                      border: 'none',
                    },
                    '&:hover': {
                      backgroundColor: '#e7e7e7',
                    },
                  }}
                >
                  Добавить в корзину
                  </Button>
                  ) : (
                    <Button
                        variant="contained"
                        onClick={deleteFromCart}
                    sx={{
                      color: '#555',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      borderRadius: '4px',
                      backgroundColor: '#e7e7e7',
                      transition: 'all 0.4s ease',
                      '.MuiButtonBase-root': {
                        color: '#555',
                      },
                      '&.MuiButton-outlinedPrimary': {
                        border: 'none',
                      },
                      '&:hover': {
                        backgroundColor: '#FFC000',
                      },
                    }}
                  >
                    Удалить из корзины
                  </Button>
                  )}
                <Button
                  variant="contained"
                  sx={{
                    color: '#555',
                    fontWeight: 'normal',
                    backgroundColor: '#E8E8E8',
                    fontSize: '14px',
                    borderRadius: '4px',
                  }}
                >
                  <FavoriteIcon
                    onClick={() => changeFavoriteStatus(data as Book)}
                    color={isFavorite ? 'error' : 'action'}
                    sx={{
                      cursor: 'pointer',
                      marginRight: '5px',
                      '&:hover': {
                        color: 'rgb(211,47,47, 0.7)',
                      },
                    }}
                  />
                  Добавить в пожелания
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default DetailsBook;
