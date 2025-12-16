import axios from "axios"
import { API_URL,getsponsor } from "../../NwConfig";
export default async function SponsorFetcher() {
    try{
        const url=API_URL+getsponsor
        const request=await axios.post(url,{})
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}