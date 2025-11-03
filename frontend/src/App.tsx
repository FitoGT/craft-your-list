import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home/Home';
import CreateDecklist from './pages/CreateDecklist/CreateDecklist';
import Register from './pages/User/Register/Register';
import Profile from './pages/User/Profile/Profile';
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />, // layout con Navbar
    children: [
      { path: '/', element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/decklists/new/:tcg', element: <CreateDecklist /> },
      { path: '/user/:id', element: <Profile /> }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}