import React from "react";
import { useState,useEffect } from "react";
import axiosClient from "../api/axios";
import {useNavigate} from "react-router-dom"

function Homepage({setisAuthenticated}) {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
        const getUser = async()=>{
          try{
            const res = await axiosClient.get("/user/me");
            const data = res.data;
            setUser(data);
          }
          catch(err)
          {
            setUser(null);
          }
        }
        getUser();
  }, []);

  const handleLogout = async()=>{

    try{
      await axiosClient.post("/user/logout");
      setisAuthenticated(false);
      navigate("/login");

    }
    catch(err)
    {
      console.error("Logout failed", err); 
    }
  }

  const Loader = () => (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#324d8b] via-[#040b29] to-black ">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  if (!user) return <Loader/>

  return (
    <>
     <div className="card w-96 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-6 text-center rounded-2xl text-white">

  {user.photo && (
      <img
        src={user.photo}
        alt="Profile"
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-white/30"
      />
    )}

    <h2 className="text-3xl font-semibold mb-3">Welcome!</h2>

    <p className="text-lg mb-4 text-gray-200">
      You have successfully logged in as
    </p>

    <p className="text-xl font-medium mb-4">
      {user.firstName} {user.lastName}
    </p>

    <p className="text-sm text-gray-300 mb-6">
      {user.emailId}
    </p>

    <button
      onClick={handleLogout}
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
    >
      Logout
    </button>
</div>

    </>
  );
}

export default Homepage;