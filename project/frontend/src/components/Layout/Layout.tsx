import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Layout.module.css';
import { Toaster } from 'react-hot-toast';
import Footer from '../Footer/Footer';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { COOKIES } from '../../enums/enums';
import { useGetUserCartQuery } from '../../store/api/BooksApi';
import { getCartItems } from '../../store/slices/CartSlice';
import { useAppDispatch } from '../../store/store';

const Layout = () => {
  const cookies = new Cookies();
  const userId = cookies.get(COOKIES.ID);
  const dispatch = useAppDispatch();

  const { data: cartItems } = useGetUserCartQuery(userId ?? skipToken);

  useEffect(() => {
    if (cartItems) {
      dispatch(getCartItems(cartItems));
    }
    if (!userId) {
      dispatch(getCartItems([]));
    }
  }, [userId, cartItems]);

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
