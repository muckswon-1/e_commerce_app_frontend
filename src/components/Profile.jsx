import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import backendService from "../utils/user";

function Profile() {
  const { isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState();
  const navigate = useNavigate();


  const fetchUserInfo =  async () => {
    try {

     const response =   await backendService.getUserInfo();

     if(response.id){
      setUser(response);
     }

     
      
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        await logout();
        navigate("/login", { state: { from: "/profile" } });
      }


    }


  }

  useEffect(() => {


     if(isAuthenticated){
        fetchUserInfo()
     }

  },[isAuthenticated, navigate])

  console.log(user)

  return (
    <div className="max-w-md mx-auto my-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Account Information</h2>
      {user ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Username:</label>
            <p className="text-gray-900">{user.username}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Email:</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Joined:</label>
            <p className="text-gray-900">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </>
      ) : (
        <p>
          {" "}
         There was a problem fetching your information. Refresh the page and then try again
        </p>
      )}
    </div>
  );
}

export default Profile;
