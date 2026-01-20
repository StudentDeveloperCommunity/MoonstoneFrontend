import axios from "axios";
import { API_URL,register } from "../../NwConfig";
export default async function AdminRegister(form) {
    try{
    const url=API_URL+register
    const res=await axios.post(url,form,{withCredentials:true})
    const resp=res.data
    return resp
    }
    catch(error){
        console.log(error)
        return error
    }
}