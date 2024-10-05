import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Layout.module.css';
import { Toaster } from 'react-hot-toast';
import Footer from '../Footer/Footer';

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
      <Footer />
    </>
  );
};

export default Layout;
