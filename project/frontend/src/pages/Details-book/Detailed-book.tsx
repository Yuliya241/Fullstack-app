import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDetailsBookQuery } from '../../store/api/BooksApi';
import Loader from '../../components/Loader/Loader';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const DetailsBook = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data, isFetching } = useGetDetailsBookQuery(id || '');

  const closeDetailed = () => {
    setIsOpen(false);
    navigate(-1);
  };

  return (
    <>
      {isFetching && !isOpen ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100dvh',
            justifyContent: 'center',
            maxWidth: '50rem',
            margin: '0 auto',
            padding: '0 4rem',
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
                <Button
                  variant="contained"
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
                  <FavoriteBorderIcon
                    color="action"
                    sx={{
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                  />
                  Добавить в пожелания
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default DetailsBook;
