import { useEffect, useState } from "react";
import BookList from "../../components/Book-list/Book-list";
import { Box } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import { API } from "../../enums/enums";
import { Book } from "../../interfaces/interfaces";
import { useCookies } from 'react-cookie';

export default function Home() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setCookie] = useCookies(['main']);

  useEffect(() => {
    // searchParams.set('page', page.toString());
    // setSearchParams(searchParams);
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        // `${API.ALLBOOKS}?p=${page}`,
        `${API.ALLBOOKS}?limit=10`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const results: Book[] = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setCookie('main', 'books', {secure: true, sameSite: 'lax'});
        setBooks(results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '4rem 2.5rem',
    }}>
      {isLoading ? (
        <Loader />
      ) : books && (
          <BookList results={books} />
        )}
    </Box>
  )
}
