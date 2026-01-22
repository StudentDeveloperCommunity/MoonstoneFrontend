import axios from "axios";
import { API_URL } from "../../NwConfig";

const DeleteSponsor = async (sponsorId) => {
  try {
    // Use POST for deletion, send sponsorId in body
    const response = await axios.post(`${API_URL}/api/sponsor/delete`, { sponsorId }, {
      withCredentials: true,
    });
    console.log("Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting sponsor:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete sponsor",
    };
  }
};

export default DeleteSponsor;
