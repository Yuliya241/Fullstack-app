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
  image: string;
  title: string;
  author: string;
  oldprice: number;
  specialprice: number;
  regularprice: number;
}
