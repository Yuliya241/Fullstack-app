import { Link } from 'react-router-dom';
import styles from './Not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.image}>404</p>
      <span className={styles.text}>Извините, страница не найдена</span>
      <Link to="/" className={styles.button}>
        На Главную
      </Link>
    </div>
  );
}
