import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Pages/Home';
import Products from './components/Products/Products';
import Admin from './Pages/Admin';
import Contact from './components/Contact/Contact';
import AboutUs from './components/AboutUs/AboutUs'
import Layout from './components/Layout/Layout';
import Search from './components/SearchBar/Search';
import AdminLayout from './components/Layout/AdminLayout';
import CreateProduct from './components/CreateProduct/CreateProduct';
import AdminProducts from './components/Admin products/AdminProducts';
import AdminDeleteProduct from './components/Admin products/AdminDeleteProduct';
import AdminModifyProduct from './components/Admin products/AdminModifyProduct';
import Login from './components/Login/Login';
import Registration from './Pages/Registration';

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
      },
      {
        path: '/belepes',
        element: <Login />
      },
      {
        path: '/regisztracio',
        element: <Registration />
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
        element: <CreateProduct />
      },
      {
        path: '/admin/termekek',
        element: <AdminProducts />
      },
      {
        path:'/admin/termekek/:id/torles',
        element: <AdminDeleteProduct/>
      },
      {
        path:'/admin/termekek/:id/modositas',
        element: <AdminModifyProduct/>
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


