import axios from "axios";
import { API_URL } from "../../NwConfig";

const DeleteSponsor = async (sponsorId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/sponsor/${sponsorId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting sponsor:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete sponsor",
    };
  }
};

export default DeleteSponsor;
