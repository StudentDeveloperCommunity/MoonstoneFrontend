import axios from "axios";
import { API_URL,deleteevent } from "../../NwConfig";
export default async function EventDelete(data) {
    console.log("=== EVENT DELETE API STARTED ===");
    console.log("Data received by EventDelete API:", data);
    console.log("Data type:", typeof data);
    console.log("Data keys:", Object.keys(data));
    console.log("ID in data:", data.id);
    
    try{
        const url=API_URL+deleteevent
        console.log("Making request to:", url);
        const resp=await axios.post(url,data,{withCredentials:true})
        const res=resp.data
        console.log("Response from server:", res);
        return res

    }catch(error){
        console.log("EventDelete API Error:", error.response?.status, error.message);
        console.log("Error response data:", error.response?.data);
        // Return the error object so frontend can handle it properly
        return error;
    }
    
}