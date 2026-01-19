import axios from "axios";
import { API_URL,login } from "../../NwConfig";
export default async function AdminLogin(form) {
    try{
    const url=API_URL+login
    const res=await axios.post(url,form,{
        withCredentials:true,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resp=res.data
    return resp
    }
    catch(error){
        console.log("Login Error:", error.response?.data || error.message)
        return {
            message: error.response?.data?.message || error.response?.data?.error || "Login failed",
            error: true
        }
    }
}