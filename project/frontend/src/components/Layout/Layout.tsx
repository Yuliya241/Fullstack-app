import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Layout.module.css';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: '1.25rem' } }}
      />
      <Header />
      <main className={styles.wrapper}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
