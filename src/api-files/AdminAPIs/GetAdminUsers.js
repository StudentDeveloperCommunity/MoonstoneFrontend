import axios from "axios"
import { API_URL,getusers } from "../../NwConfig";
export default async function GetAdminUsers() {
    try{
        const url=API_URL+getusers
        const request=await axios.post(url,{},
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