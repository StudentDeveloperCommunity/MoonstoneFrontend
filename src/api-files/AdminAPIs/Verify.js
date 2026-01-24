import axios from "axios";
import { API_URL, verify } from "../../NwConfig";
export default async function Verify() {
    try {
        const url = API_URL + verify;
        const res = await axios.get(url, { withCredentials: true });
        return res.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}