import axios from "axios";
import { API_URL,addnewevent } from "../../NwConfig";
export default async function EventAdd(form) {
    try{
    const url=API_URL+addnewevent
    const res=await axios.post(url,form,{withCredentials:true})
    const resp=res.data
    return resp
    }
    catch(error){
        console.log("EventAdd API - Error:", error.response?.status, error.message);
        return error
    }
}