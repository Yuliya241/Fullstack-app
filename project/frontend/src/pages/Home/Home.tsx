import { useEffect, useState } from 'react';
import BookList from '../../components/Book-list/Book-list';
import { Box, PaginationItem } from '@mui/material';
import Loader from '../../components/Loader/Loader';
import { API } from '../../enums/enums';
import { BookResponse } from '../../interfaces/interfaces';
import { useCookies } from 'react-cookie';
import Pagination from '@mui/material/Pagination';
import { Link as NavLink, useLocation } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState<BookResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setCookie] = useCookies(['main']);
  const location = useLocation();
  const [page, setPage] = useState(
    parseInt(location.search?.split('=')[1]) || 1
  );

  useEffect(() => {
    getAllBooks();
  }, [page]);

  const getAllBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API.ALLBOOKS}?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res: BookResponse = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setCookie('main', 'books', { secure: true, sameSite: 'lax' });
        setBooks(res);
        setPage(page);
      }
    } catch (error) {
      console.error(error);
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
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        books && (
          <>
            <Pagination
              page={page}
              count={Math.ceil(books.count / 50)}
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
            <BookList results={books.results} />
          </>
        )
      )}
    </Box>
  );
}
