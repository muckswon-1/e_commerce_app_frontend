import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({element: Component, ...rest}) {

    const {isAuthenticated} = useAuth();
    const location = useLocation();

  return isAuthenticated ? (
    <Component {...rest} />
  ): <Navigate to='/login' state={{from: location}}/>
}

export default PrivateRoute