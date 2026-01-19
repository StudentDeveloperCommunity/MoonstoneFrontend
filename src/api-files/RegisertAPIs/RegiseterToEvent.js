import axios from "axios";
import { API_URL,registerevent } from "../../NwConfig";
export default async function RegisterToEvent(form) {
    try{
    const url=API_URL+registerevent
    const res=await axios.post(url,form,{withCredentials:true})
    const resp=res.data
    return resp
    }
    catch(error){
        console.log(error)
        return error
    }
}