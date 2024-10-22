import { Box, Typography } from '@mui/material';
import { FavoriteBook } from '../../interfaces/interfaces';
import BookItem from '../Book-item/Book-item';

const FavoriteList = ({ results }: { results: FavoriteBook[] }) => {
  return (
    <>
      {results.length ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          {results.map((book, index) => (
            <BookItem key={index} {...book.book} />
          ))}
        </Box>
      ) : (
        <Typography variant="h6">Список избранного пуст</Typography>
      )}
    </>
  );
};

export default FavoriteList;
