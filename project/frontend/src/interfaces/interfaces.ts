export interface AuthFormData {
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export interface AuthResponse {
  user: {
    username: string;
    email: string;
  };
  token: string;
}

export interface Book {
  id: number;
  image: string;
  title: string;
  author: string;
  oldprice: number;
  specialprice: number;
  regularprice: number;
}

export interface BookResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Book[];
}

export interface SearchState {
  books: Book[];
  search: string | null;
}

export interface FavoriteState {
  favoriteBooks: FavoriteBook[];
}

export interface FavoriteResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: FavoriteBook[];
}

export interface FavoriteBook {
  id?: number;
  user?: number | null;
  book: Book;
}

export interface CartResponse {
  data: CartItem[];
  cart_total_price: number;
}

export interface CartItem {
  quantity: number;
  specialprice: number;
  regularprice: number;
  book: Book;
  total_price: number;
}
