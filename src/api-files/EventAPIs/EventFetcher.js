import axios from "axios"
import { API_URL,getevents } from "../../NwConfig";
export default async function EventFetcher(data) {
    try{
        const url=API_URL+getevents
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