import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { Book } from '../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { API, COOKIES } from '../../enums/enums';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  selectCartItem,
  selectFavoriteBook,
} from '../../store/selectors/Selectors';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/slices/FavoriteSlice';
import { Cookies } from 'react-cookie';
import toast from 'react-hot-toast';
import {
  addBookToCart,
  removeBookFromCart,
} from '../../store/slices/CartSlice';

const BookItem = (props: Book) => {
  const { id, image, title, author, oldprice, specialprice, regularprice } =
    props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectFavoriteBook(id));
  const isInCart = useAppSelector(selectCartItem(id));
  const cookies = new Cookies();
  const userId = cookies.get(COOKIES.ID);
  const token = cookies.get(COOKIES.TOKEN);

  const openDetailed = () => {
    navigate(
      `${location.pathname.replace('favorites', '')}book/${id}${location.search}`
    );
  };

  const book = {
    book_id: id,
    image: image,
    title: title,
    author: author,
    oldprice: oldprice,
    specialprice: specialprice,
    regularprice: regularprice,
    quantity: 1,
    user: userId,
  };

  const changeFavoriteStatus = async (book: Book) => {
    if (userId) {
      try {
        const response = await fetch(
          `${API.ALLBOOKS}api/books/${id}/favorite`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          return !isFavorite
            ? dispatch(addToFavorites(book))
            : dispatch(removeFromFavorites(book));
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      toast.error(
        'Для добавления в избранное, пожалуйста, войдите в учетную запись'
      );
      navigate('/signin');
    }
  };

  const addToCart = async () => {
    if (userId) {
      try {
        const response = await fetch(API.CART_ADD, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(book),
        });

        if (response.ok) {
          dispatch(addBookToCart(book));
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      toast.error(
        'Для добавления в корзину, пожалуйста, войдите в учетную запись'
      );
      navigate('/signin');
    }
  };

  const deleteFromCart = async () => {
    try {
      const response = await fetch(`${API.CART_DELETE}${id}/`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        dispatch(removeBookFromCart(book));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card
      sx={{
        width: '12.5rem',
        height: '22.5rem',
        cursor: 'pointer',
        marginBottom: 3,
        backgroundColor: '#f1f1f1',
      }}
    >
      <CardContent
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
        }}
      >
        <Box onClick={openDetailed}>
          <Box sx={{ width: '200px', height: '200px' }}>
            <img
              src={image}
              alt={title}
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box
            sx={{
              padding: '10px',
              width: '100%',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                color: '#555555',
                textAlign: 'left',
                fontSize: '0.9rem',
                overflow: 'hidden',
                position: 'relative',
                height: '45px',
                '&::after': {
                  content: '""',
                  textAlign: 'right',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '70%',
                  height: '1.2em',
                  background:
                    'linear-gradient(to right, rgba(255, 255, 255, 0), #eaeaea 50%)',
                  pointerEvents: 'none',
                },
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: '#555555',
                textAlign: 'left',
                fontSize: '0.9rem',
              }}
            >
              {author}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                paddingTop: '5px',
              }}
            >
              {regularprice === 0 ? (
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
                    {oldprice} руб
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      lineHeight: '1.2',
                      color: '#555',
                      fontWeight: 'bold',
                    }}
                  >
                    {specialprice} руб
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
                  {regularprice} руб
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Stack
          direction="row"
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          {!isInCart ? (
            <Button
              onClick={addToCart}
              variant="outlined"
              sx={{
                color: '#23b4ca',
                marginRight: '3px',
                transition: 'all 0.4s ease',
                '.MuiButtonBase-root': {
                  color: '#23b4ca',
                },
                '&.MuiButton-outlinedPrimary': {
                  border: '1px solid #23b4ca',
                },
                '&:hover': {
                  color: '#ffffff',
                  backgroundColor: '#23b4ca',
                },
              }}
            >
              В корзину
            </Button>
          ) : (
            <Button
              onClick={deleteFromCart}
              variant="contained"
              sx={{
                color: 'ffffff',
                marginRight: '3px',
                backgroundColor: '#23b4ca',
                transition: 'all 0.4s ease',
                '.MuiButtonBase-root': {
                  color: '#23b4ca',
                },
                '&.MuiButton-outlinedPrimary': {
                  border: '1px solid #23b4ca',
                },
                '&:hover': {
                  color: '#23b4ca',
                  backgroundColor: 'transparent',
                  border: '1px solid #23b4ca',
                },
              }}
            >
              В корзине
            </Button>
          )}
          <FavoriteIcon
            onClick={() => changeFavoriteStatus(props)}
            color={isFavorite ? 'error' : 'action'}
            sx={{
              cursor: 'pointer',
              marginRight: '5px',
              '&:hover': {
                color: 'rgb(211,47,47, 0.7)',
              },
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookItem;
