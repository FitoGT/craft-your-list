import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home/Home';
import CreateDecklist from './pages/CreateDecklist/CreateDecklist';
import Register from './pages/Register/Register';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet /> {/* las páginas se renderizan acá */}
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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}