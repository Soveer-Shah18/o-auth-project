import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";

import { useEffect, useState } from "react";
import axiosClient from "./api/axios";

function App() {
  
  const [isAuthenticated, setisAuthenticated] = useState(null);

  useEffect(() => {
  const checkAuth = async () => {

    try {
      await axiosClient.get("/auth/check");

      await new Promise((res) => setTimeout(res, 1000));
      
      setisAuthenticated(true);
    } 
    catch (err) {
      setisAuthenticated(false);
    }
  };

  checkAuth();
}, []);

    const Loader = () => (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#324d8b] via-[#040b29] to-black ">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  if(isAuthenticated === null)
    return <Loader/>;

  return (
    <>
      <Routes>
        <Route
      path="/homepage"
      element={isAuthenticated ? <Homepage setisAuthenticated={setisAuthenticated} /> : <Navigate to="/login" />}
       />

        <Route
      path="/login"
      element={isAuthenticated ? <Navigate to="/homepage" /> : <Login setisAuthenticated={setisAuthenticated} />}
      />

        <Route
      path="/signup"
      element={isAuthenticated ? <Navigate to="/homepage" /> : <Signup />}
      />

        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </>
  );
}

export default App;
