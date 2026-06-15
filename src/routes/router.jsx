import { createBrowserRouter } from 'react-router';
import Root from '../layouts/Root';
import AllAppsPage from '../pages/AllAppsPage';
import AppDetails from '../pages/AppDetails';
import Home from '../pages/Home';
import MyInstallation from '../pages/MyInstallation';
import ErrorPage from '../ui/Error404';
import LoadingPage from '../ui/LoadingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <LoadingPage></LoadingPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/apps?limit=8'),
      },
      {
        path: '/apps',
        element: <AllAppsPage></AllAppsPage>,
      },
      {
        path: '/apps/:id',
        element: <AppDetails></AppDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/apps/${params.id}`),
      },
      {
        path: '/installations',
        element: <MyInstallation></MyInstallation>,
        loader: () => fetch('http://localhost:5000/apps?limit=8'),
      },
      {
        path: '/blogs',
        element: <h2>Single Items</h2>,
      },
    ],
  },
]);

export default router;
