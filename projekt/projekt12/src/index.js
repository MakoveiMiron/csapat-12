import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Pages/Home';
import Products from './components/Products/Products';
import Admin from './Pages/Admin';
import Contact from './components/Contact/Contact';
import AboutUs from './components/AboutUs/AboutUs'
import Layout from './components/Layout/Layout';
import Search from './components/SearchBar/Search';
import AdminLayout from './components/Layout/AdminLayout';
import Admin1 from './components/Admin1/Admin1';
import AdminProducts from './components/Admin products/AdminProducts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/termekek',
        element: <Products />
      },
      {
        path: '/kapcsolat',
        element: <Contact />
      },
      {
        path: '/rolunk',
        element: <AboutUs />
      },
      {
        path: '/kereses',
        element: <Search />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
        element: <Admin/>
      },
      {
        path: '/admin/termek-felvetel',
        element: <Admin1 />
      },
      {
        path: '/admin/termekek',
        element: <AdminProducts />
      }
    ]
  }
  
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


