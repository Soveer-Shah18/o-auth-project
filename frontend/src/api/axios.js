import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://o-auth-project.onrender.com",
    withCredentials: true,
    headers:{
        "Content-Type": "application/json"
    },
}); 

export default axiosClient;