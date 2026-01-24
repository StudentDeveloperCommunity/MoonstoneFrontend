import axios from "axios";
import { API_URL, logout } from "../../NwConfig";
export default async function Logout() {
    try {
        const url = API_URL + logout;
        const res = await axios.post(url, {}, { withCredentials: true });
        return res.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}