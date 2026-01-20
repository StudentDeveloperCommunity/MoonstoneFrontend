import axios from "axios";
import { API_URL, addsponsor } from "../../NwConfig";
export default async function AddNewSponsors(form) {
    try{
        const url=API_URL+addsponsor
        const res=await axios.post(url,form,{withCredentials:true})
        const resp=res.data
        return resp
    }
    catch(error){
        console.error("Error adding sponsor:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to add sponsor"
        };
    }
}