import axios from "axios";
import { API_URL,registerupdate } from "../../NwConfig";
export default async function RegistrationUpdate(form) {
    try{
    const url=API_URL+registerupdate
    const res=await axios.put(url,form,{withCredentials:true})
    const resp=res.data
    return resp
    }
    catch(error){
        console.log(error)
        return error
    }
}