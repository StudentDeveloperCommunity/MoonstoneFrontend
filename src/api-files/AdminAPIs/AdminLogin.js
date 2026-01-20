import axios from "axios";
import { API_URL,login } from "../../NwConfig";
export default async function AdminLogin(form) {
    try{
    const url=API_URL+login
    console.log("Login URL:", url);
    console.log("Request body:", form);
    const res=await axios.post(url,form,{withCredentials:true})
    const resp=res.data
    return resp
    }
    catch(error){
        console.log("Full error:", error);
        console.log("Error response data:", error.response?.data);
        console.log("Error status:", error.response?.status);
        return error.response?.data || {message: "Network error or server unreachable"}
    }
}