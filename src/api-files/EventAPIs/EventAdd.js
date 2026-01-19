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
        console.log(error)
        return {
            success:false,
            status:error?.response?.status,
            message:error?.response?.data?.message || error?.response?.data?.error || error?.message,
        }
    }
}