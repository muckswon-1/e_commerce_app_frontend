import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import backendService from '../utils/user';
import history from '../history/history';
import { useCart } from './CartProvider';
import { useSharedContext } from './SharedProvider';

const AuthContext = createContext();


export function AuthProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("authenticated") === true);
  const tokenCheckInterval = 60000;
  const {sharedState, setSharedState} = useSharedContext();

  useEffect(() => {
    const verifyToken = async () => {
      try {


        const res = await backendService.verifyAccessToken();
      
        if(res === true){
          setSharedState((prevState) =>({
            ...prevState,
            authData: isAuthenticated
          }))
          sessionStorage.setItem("authenticated", true);

        }else{
          throw new Error();
        }
        
      } catch (error) {
        setIsAuthenticated(false);
        sessionStorage.clear();
      }
    };

    verifyToken();

    const intervalId = setInterval(() => {
      verifyToken();
    },tokenCheckInterval);

    return () => clearInterval(intervalId);
  },[]);


  const updateAuthData = (data) => {
    setSharedState((prevState) =>({
      ...prevState,
      authData: data
    }))
  }




  const login = async (username, password) => {
    try {

      const response = await backendService.login(username, password);
 
      if(response.jwtToken){
    
        setIsAuthenticated(true);
        sessionStorage.setItem('jwtToken',JSON.stringify(response.jwtToken));
        sessionStorage.setItem('userId',JSON.stringify(response.userId));
        sessionStorage.setItem("authenticated", true);
  
      }

    } catch (error) {
      setIsAuthenticated(false);
      throw error
    }
  }


  const logout =  async () => {
    
    try {
      
      const response = await backendService.logout();
      console.log(response);

      if(response === true){
        sessionStorage.clear();
        return true
      } else throw new Error();

    } catch (error) {
       throw error;
    }
    
  }





  return (
    <AuthContext.Provider value={{authData: sharedState.authData, updateAuthData,isAuthenticated, setIsAuthenticated, logout, login}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

