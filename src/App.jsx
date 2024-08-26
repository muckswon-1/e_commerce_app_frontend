import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, RouterProvider,BrowserRouter, createBrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Home from './components/Home';
import backendService from './utils/user';
import { toast, ToastContainer } from 'react-toastify';
import Header from './components/Header';
import { AuthProvider } from './context/AuthProvider';
import history from './history/history';
import PrivateRoute from './components/PrivateRoute';
import RootProvider from './context/RootProvider';
import Cart from './components/Cart';


function App() {



  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/profile",
          element: <PrivateRoute element={Profile} />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: '/cart',
          element: <PrivateRoute element={Cart} />
        }
      ]
    }
   
 
 
  ])



  return (

    <RootProvider>
      <RouterProvider router={router} />
    </RootProvider>

  )
}

export default App
