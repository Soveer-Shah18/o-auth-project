import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import axiosClient from "../api/axios";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password")

const onSubmit = async (data) => {
  try {
    await axiosClient.post("/user/register", data);
    
    alert("Signup Successful!");
    navigate("/login");
  } 
  catch (err) {
    alert(err.response?.data?.message || "Signup Failed");
  }
};


  return (
       <div className="min-h-screen w-full bg-gradient-to-b from-[#324d8b] via-[#040b29] to-black">
      <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-blend px-6 py-5 rounded-lg shadow">
        <h2 className="text-4xl font-mono font-bold text-center mb-2 text-white">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
          <div>
            <label className="block text-white mb-1">First Name</label>
            <input placeholder="Hello"
              type="text"
              {...register("firstName",{
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 20, message: "Maximum 20 characters" },
              } )}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-white placeholder-gray-400"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
    
          <div>
            <label className="block text-white mb-1">Last Name (Optional)</label>
            <input placeholder="World"
              type="text"
              {...register("lastName", {
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 20, message: "Maximum 20 characters" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-white placeholder-gray-400"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
   
          <div>
            <label className="block text-white mb-1">Email</label>
            <input placeholder="helloworld@gmail.com"
              type="email"
              {...register("emailId", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-white placeholder-gray-400"
            />
            {errors.emailId && (
              <p className="text-red-500 text-sm">{errors.emailId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white mb-1">Age (Optional)</label>
            <input placeholder="6 - 80"
              type="number"
              {...register("age", {
                min: { value: 6, message: "Minimum age is 6" },
                max: { value: 80, message: "Maximum age is 80" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-white placeholder-gray-400"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white mb-1">Password</label>
            <input placeholder="••••••••"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-white placeholder-gray-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white  mb-1">Confirm Password</label>
            <input placeholder="••••••••"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your Password",
                validate: (value) => value === password || "Passwords do not Match"
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-white placeholder-gray-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <button 
          onClick={()=>(
          window.location.href = "https://o-auth-project.onrender.com/auth/google"
          )}
                  
        className="w-full flex items-center justify-center gap-3 bg-white text-black py-2 rounded-md mt-2 hover:bg-gray-300">
        <FcGoogle size={20} />
        Continue with Google
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>

    </div>
    
  );
}

export default Signup;
