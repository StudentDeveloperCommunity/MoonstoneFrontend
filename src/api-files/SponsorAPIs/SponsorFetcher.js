import axios from "axios"
import { API_URL,getsponsor } from "../../NwConfig";
export default async function SponsorFetcher() {
    try{
        const url=API_URL+getsponsor
        const request=await axios.get(url, { withCredentials: true })
        const response=await request.data;
        return response
    }catch(error){
        console.error("Error fetching sponsors:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch sponsors"
        };
    }
}