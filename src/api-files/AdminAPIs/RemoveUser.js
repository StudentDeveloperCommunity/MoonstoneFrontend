import axios from "axios";
import { API_URL } from "../../NwConfig";

export default async function RemoveUser(userId) {
    try {
        const url = API_URL + `/api/auth/removeuser/${userId}`;
        const res = await axios.delete(url, { 
            withCredentials: true 
        });
        const resp = res.data;
        return resp;
    } catch (error) {
        console.log(error);
        return error.response?.data || error;
    }
}
