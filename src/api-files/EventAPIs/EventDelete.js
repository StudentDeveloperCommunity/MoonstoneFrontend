import axios from "axios";
import { API_URL,deleteevent } from "../../NwConfig";
export default async function EventDelete(data) {
    try{
        const url=API_URL+deleteevent
        const resp=await axios.post(url,data,{withCredentials:true})
        const res=resp.data
        return res

    }catch(error){
        console.log(error.message)
        return {
            success:false,
            status:error?.response?.status,
            message:error?.response?.data?.message || error?.response?.data?.error || error?.message,
        }
    }
    
}