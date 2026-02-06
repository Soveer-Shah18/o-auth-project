import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import axiosClient from "../api/axios";
import { FcGoogle } from "react-icons/fc";

function Login({setisAuthenticated}) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosClient.post("/user/login" ,data)

      setisAuthenticated(true);
      navigate("/homepage");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#324d8b] via-[#040b29] to-black">
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-blend p-8 rounded-lg shadow-md">
        <h2 className="text-5xl font-mono mb-6 text-center text-white ">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              {...register("emailId", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-white placeholder-gray-400"
              placeholder="you@example.com"
            />
            {errors.emailId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailId.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-white placeholder-gray-400"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mb-2"
          >
            Login
          </button>
        </form>

        {/* Link */}
        <div>
          <button 
          onClick={()=>(
            window.location.href = "https://o-auth-project.onrender.com/auth/google"
          )}
          
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-2 rounded-md mt-2 hover:bg-gray-300">
          <FcGoogle size={20} />
           Continue with Google
          </button>

          <p className="text-center text-sm mt-4 text-white">
          Don&apos;t have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Register
          </NavLink>
        </p>
        </div>
        
      </div>
    </div>
    </div>
  );
}

export default Login;
