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
