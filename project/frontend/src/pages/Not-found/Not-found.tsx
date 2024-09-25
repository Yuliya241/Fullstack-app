import { Link } from 'react-router-dom';
import styles from './Not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.image}>404</p>
      <span className={styles.text}>Sorry, the page is Not Found</span>
      <Link to="/" className={styles.button}>
        GO HOME
      </Link>
    </div>
  );
}
