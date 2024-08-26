import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemList from './ItemList';
import Header from './Header';
import Item from './Item';
import backendService from '../utils/user';
import { AuthProvider } from '../context/AuthProvider';

function Home() {
   
    const navigate = useNavigate();
    const location = useLocation();
    const tokenCheckInterval = 30000;
    const isAuthenticated = sessionStorage.getItem("authenticated");

   
    return (
       <>
        <Header />
        {
            location.pathname === '/' ? <ItemList /> : <Outlet />
        }
        <ToastContainer />
       
   </>
    );
}

export default Home;
