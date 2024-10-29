import { Navigate, Outlet } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { COOKIES } from '../enums/enums';

function PrivateRoute() {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get(COOKIES.TOKEN);
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}
export default PrivateRoute;
