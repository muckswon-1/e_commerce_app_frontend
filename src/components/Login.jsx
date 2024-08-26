import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


function Login() {
  const [userUsername, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { isAuthenticated } = useAuth();

  const {login} = useAuth();


  useEffect(() => {
    if(isAuthenticated){
      navigate(from,{replace: true})
    }
  },[isAuthenticated,navigate, from])

 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!userUsername || !userPassword) {
      toast("Username and password are required");
      return;
    }

    try {
         await login(userUsername, userPassword);
         navigate(from,{replace: true})
    
    } catch (error) {
      console.error(error);
      toast.error("Incorrect username or password");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h6 className="text-xl font-semibold mb-4 text-center">Login to access your shopping account</h6>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={userUsername}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            placeholder="Enter username"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={userPassword}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter password"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">Click here to create a new account</Link>
        </p>

        <ToastContainer />
      </form>
    </div>
  );
}

export default Login;
