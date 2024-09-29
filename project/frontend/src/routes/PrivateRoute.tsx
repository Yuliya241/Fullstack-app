import { Navigate, Outlet } from 'react-router-dom';
import { Cookies } from 'react-cookie';

function PrivateRoute() {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get('user');
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}
export default PrivateRoute;
