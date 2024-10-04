import { Book } from '../../interfaces/interfaces';
import BookItem from '../Book-item/Book-item';
// import styles from './Results-list.module.css';

const BookList = ({ results }: { results: Book[] }) => {
  return (
    <>
      {results.length ? (
        <div>
          {results.map((book: Book, index) => (
            <BookItem key={index} {...book} />
          ))}
        </div>
      ) : (
        <p>Ничего не найдено...</p>
      )}
    </>
  );
}

export default BookList;