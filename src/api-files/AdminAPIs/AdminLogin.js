import axios from "axios";
import { API_URL,login } from "../../NwConfig";
export default async function AdminLogin(form) {
    try{
    const url=API_URL+login
    const res=await axios.post(url,form,{withCredentials:true})
    const resp=res.data
    return resp
    }
    catch(error){
        console.log(error)
        return error
    }
}