import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { Book, CartResponse } from '../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { API } from '../../enums/enums';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectFavoriteBook } from '../../store/selectors/Selectors';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/slices/FavoriteSlice';

const BookItem = (props: Book) => {
  const { id, image, title, author, oldprice, specialprice, regularprice } =
    props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectFavoriteBook(id));

  const openDetailed = () => {
    navigate(
      `${location.pathname.replace('favorites', '')}book/${id}${location.search}`
    );
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
    const book = {
      book: {
        id: id,
        image: image,
        title: title,
        author: author,
        oldprice: oldprice,
        specialprice: specialprice,
        regularprice: regularprice,
      },
      quantity: 1,
    }
    try {
      const response = await fetch(API.CART, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      // const cart = await response.json();
      // console.log(cart)
      // return cart;
      // const token = user.token;
      if (response.ok) {
        // toast.success('Учетная запись успешно создана.');
        console.log(response)
        // navigate('/');
      }
    } catch (e) {
      console.error(e);
      // toast.error(
      //   'Ошибка во время попытки зарегистрироваться. Попробуйте снова.'
      // );
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
