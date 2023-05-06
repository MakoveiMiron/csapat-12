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

const router = createBrowserRouter([
  {
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
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/kapcsolat',
        element: <Contact />
      },
      {
        path: '/rolunk',
        element: <AboutUs />
      }
    ]
  },
  
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


