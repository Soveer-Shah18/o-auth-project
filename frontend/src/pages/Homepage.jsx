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
     <div className="min-h-screen w-full bg-gradient-to-b from-[#324d8b] via-[#040b29] to-black">
      <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ fontFamily: "sans-serif" }}
    >
      <div className="card w-96 bg-cyan-100 shadow-xl p-6 text-center text-gray-900">

      {user.photo && (
        <img
          src={user.photo}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
        />
      )}

        <h2 className="card-title justify-center text-3xl mb-4">Welcome!</h2>
        <p className="text-lg mb-6 ">
          You have successfully logged in as <strong>{user.firstName} {user.lastName}</strong>.
        </p>
        <p>Enjoy your session!</p>
        <p>Your email is: <strong>{user.emailId}</strong></p>

        <button onClick={handleLogout} 
        className="w-full bg-blue-400 text-white py-2 mt-5 rounded-md hover:bg-red-400 transition">
          Logout
        </button>
      </div>
    </div>
    </div>
    </>
  );
}

export default Homepage;