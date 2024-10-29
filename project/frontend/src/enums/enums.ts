export const enum ErrorBoundaryValues {
  MESSAGE = 'It is an test error',
  CONSOLE_ERROR = 'ErrorBoundary caught an error:',
}

export const enum API {
  LOGIN = 'http://127.0.0.1:8000/api/login/',
  REGISTER = 'http://127.0.0.1:8000/api/register/',
  LOGOUT = 'http://127.0.0.1:8000/api/logout/',
  ALLBOOKS = 'http://127.0.0.1:8000/',
  CART_ADD = 'http://127.0.0.1:8000/cart/add/',
  CART_UPDATE = 'http://127.0.0.1:8000/cart/update/',
  CART_DELETE = 'http://127.0.0.1:8000/cart/delete/',
}

export const enum COOKIES {
  ID = 'userId',
  TOKEN = 'userToken',
}
