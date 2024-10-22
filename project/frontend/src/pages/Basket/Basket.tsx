// import Counter from '../Counter/Counter';
import { useEffect } from 'react';
import { API } from '../../enums/enums';
import { CartResponse } from '../../interfaces/interfaces';

const Basket = () => {
  // const [counter, setCounter] = useState(1);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const response = await fetch(API.CART, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const cart: CartResponse = await response.json();
      console.log(cart)
      return cart;
      // const token = user.token;
      // if (response.ok) {
      //   // toast.success('Учетная запись успешно создана.');
      //   setCookie('user', token);
      //   // navigate('/');
      // }
    } catch (e) {
      console.error(e);
      // toast.error(
      //   'Ошибка во время попытки зарегистрироваться. Попробуйте снова.'
      // );
    }
  };

  return (
    <h1>Basket page</h1>
    // <Counter value={counter} />
  );
};

export default Basket;
