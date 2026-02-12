import axios from "axios"
import { API_URL,getevents } from "../../NwConfig";

export default async function EventFetcher(data) {
    try{
        const url=API_URL+getevents
        
        // Mobile optimization: add timeout and retry logic
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
        
        const request=await axios.post(url, data, {
            withCredentials: true,
            signal: controller.signal,
            timeout: 15000 // 15s timeout
        });
        
        clearTimeout(timeoutId);
        const response=await request.data;
        return response
        
    }catch(error){
        // Mobile-specific error handling
        if (error.code === 'ECONNABORTED' || error.name === 'AbortError') {
            return { 
                success: false, 
                message: "Request timeout. Please check your connection and try again." 
            };
        } else if (!navigator.onLine) {
            return { 
                success: false, 
                message: "No internet connection. Please check your network." 
            };
        } else if (error.response) {
            return { 
                success: false, 
                message: "Server error. Please try again later." 
            };
        } else {
            return { 
                success: false, 
                message: "Network error. Please try again." 
            };
        }
    }
}