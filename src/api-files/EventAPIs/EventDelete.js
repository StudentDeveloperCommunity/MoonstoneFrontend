import axios from "axios";
import { API_URL,deleteevent } from "../../NwConfig";
export default async function EventDelete(data) {
    try{
        const url=API_URL+deleteevent
        const resp=await axios.post(url,data,{withCredentials:true})
        const res=resp.data
        return res

    }catch(error){
        console.log("EventDelete API Error:", error.response?.status, error.message);
        // Return the error object so frontend can handle it properly
        return error;
    }
    
}