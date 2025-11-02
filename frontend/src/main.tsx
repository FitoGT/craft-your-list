import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Decklists from './pages/Decklists/Decklists';

const qc = new QueryClient();
const router = createBrowserRouter([
  { path: '/', element: <Decklists /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/decklists', element: <Decklists /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
