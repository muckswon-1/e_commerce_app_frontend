import React, { useState } from 'react';

import { Cart, PersonCircle } from 'react-bootstrap-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';

function Header() {
  const {logout, isAuthenticated} = useAuth()
  const navigate = useNavigate();
  const location = useLocation();


  const logutButtnonClick = async () => {

    try {

      await logout();
      navigate(0)
      
    } catch (error) {
      console.error('An error occured wile trying to logout', error);
      toast.error('Logout failed')
    }

  }

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to='/' className="text-2xl font-bold">Shop World</Link>
      <nav>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to='/cart' className="text-gray-700 hover:text-gray-900 transition duration-300">
              <Cart size={24} />
            </Link>
          </li>
          {isAuthenticated ? (
            <>
            <li>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={logutButtnonClick}
              >
                Logout
              </button>
            </li>
            <li>
              <Link to='/profile'>
              <PersonCircle />
              </Link>
            </li>
            </>
            
          ) : (
            <>
              <li>
                <Link
                  to='/login' 
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <a 
                  href='/register' 
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  Register
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <ToastContainer />
    </header>
  );
}

export default Header;
