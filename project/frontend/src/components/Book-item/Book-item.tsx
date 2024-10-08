import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { Book } from '../../interfaces/interfaces';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const BookItem = (props: Book) => {
  const { id, image, title, author, oldprice, specialprice, regularprice } = props;
  const navigate = useNavigate();

  const openDetailed = () => {
    navigate(`book/${id}${location.search}`);
  };

  return (
    <Card
    onClick={openDetailed}
      sx={{
        width: '12.5rem',
        height: '22.5rem',
        cursor: 'pointer',
        marginBottom: 3,
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
        <Box sx={{ width: '200px', height: '200px' }}>
          <img
            src={image}
            alt={title}
            style={{ width: '100%', objectFit: 'cover', paddingTop: '3px' }}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: '#f1f1f1',
            padding: '10px',
            width: '100%',
            height: '10em',
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
          <Stack
            direction="row"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Button
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
            <FavoriteBorderIcon color="action" />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookItem;
