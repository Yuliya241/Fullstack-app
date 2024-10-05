import { Box } from '@mui/material';
import { Book } from '../../interfaces/interfaces';
import BookItem from '../Book-item/Book-item';

const BookList = ({ results }: { results: Book[] }) => {
  return (
    <>
      {results.length && (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
          {results.map((book: Book, index) => (
            <BookItem key={index} {...book} />
          ))}
        </Box>
      )}
    </>
  );
}

export default BookList;