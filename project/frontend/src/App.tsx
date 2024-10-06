import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/routes';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ErrorBoundary>
  );
}
