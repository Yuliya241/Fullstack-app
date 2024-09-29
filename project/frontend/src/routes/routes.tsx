import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/Not-found/Not-found';
import Layout from '../components/Layout/Layout';
import SignIn from '../pages/Sign-in/Sign-in';
import SignUp from '../pages/Sign-up/Sign-up';
import Basket from '../pages/Basket/Basket';
import Profile from '../pages/Profile/Profile';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/basket" element={<Basket />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
