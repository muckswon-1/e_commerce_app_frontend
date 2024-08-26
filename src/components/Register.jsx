import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backendService from '../utils/user';
import { useAuth } from '../context/AuthProvider';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    if(isAuthenticated){
      navigate(from, {replace: true});
    }

  },[isAuthenticated, navigate, from])


  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email is required');
      return;
    }

    if (!username) {
      toast.error('Username is required');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (!confirmPassword) {
      toast.error('Confirm password is required');
      return;
    }

    if (confirmPassword !== password) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await  backendService.register({email, username, password});
      if (response.data === 'Created') {
        navigate('/login');
      } else {
        throw new Error('An error occurred while creating a new user. Please try again');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <p className="text-xl font-semibold mb-4 text-center">Fill in the information below to create a new shopping account</p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={username}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter password"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirm-password"
            placeholder="Enter password again"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Register
        </button>
        <p className="mt-4 text-center text-gray-700">
          If you already have an account, <Link to='/login' className="text-blue-500 hover:underline">Click here to login</Link>
        </p>

        <ToastContainer />
      </form>
    </div>
  );
}

export default Register;
