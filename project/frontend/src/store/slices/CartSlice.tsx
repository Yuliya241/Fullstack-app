import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../../interfaces/interfaces';

const initialState: CartState = {
  cartItems: [],
  total: 0,
  quantity: 1,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addBookToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
      let sum = 0;
      state.cartItems.map((book: CartItem) => {
        if (book.regularprice) {
        sum += book.regularprice*book?.quantity
        } else {
        sum += book.specialprice*book?.quantity
      }
      });
      state.total = sum;
    },
    removeBookFromCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = state.cartItems.filter((item) => item.book_id !== action.payload.book_id);
      let sum = 0;
      state.cartItems.map((book: CartItem) => {
        if (book.regularprice) {
        sum += book.regularprice*book?.quantity
        } else {
        sum += book.specialprice*book?.quantity
      }
      });
      state.total = sum;
    },
    getCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
      let sum = 0;
      state.cartItems.map((book: CartItem) => {
        if (book.regularprice) {
        sum += book.regularprice*book?.quantity
        } else {
        sum += book.specialprice*book?.quantity
      }
      });
      state.total = sum;
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    setSelectedBook: (state, action: PayloadAction<number>) => {
      const book = state.cartItems.find((book: CartItem) => book.book_id === action.payload);
      if (book) {
        book.quantity = state.quantity;
        state.selectBook = book
      }
      let sum = 0;
      state.cartItems.map((book: CartItem) => {
        if (book.regularprice) {
        sum += book.regularprice*book?.quantity
        } else {
        sum += book.specialprice*book?.quantity
      }
      });
      state.total = sum;
    },
  },
});

export const { addBookToCart, removeBookFromCart, getCartItems, setQuantity, setSelectedBook } =
  cartSlice.actions;