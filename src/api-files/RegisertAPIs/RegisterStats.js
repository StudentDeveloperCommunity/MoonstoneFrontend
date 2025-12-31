import axios from "axios"
import { API_URL,registereventstatfetcher } from "../../NwConfig";
export default async function RegisterStats(data) {
    try{
        const url=API_URL+registereventstatfetcher
        const request=await axios.post(url,data,
            {withCredentials:true}
        )
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}