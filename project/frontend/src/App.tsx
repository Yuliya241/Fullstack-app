import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/routes';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router}></RouterProvider>
    </ErrorBoundary>
  );
}
